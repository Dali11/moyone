import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env.local") });

const url = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;

if (!url) {
  console.error("Database URL unavailable.");
  process.exit(1);
}

const sql = neon(url);

function extractObjects(source) {
  const marker = "export const projects: Project[] = [";
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error("Could not find the projects array declaration.");
  }

  const start = source.indexOf("[", markerIndex);
  const objects = [];

  let depth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let i = start + 1; i < source.length; i++) {
    const ch = source[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") {
      if (depth === 0) objectStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;

      if (depth === 0 && objectStart !== -1) {
        objects.push(source.slice(objectStart, i + 1));
        objectStart = -1;
      }
    } else if (ch === "]" && depth === 0) {
      return objects;
    }
  }

  throw new Error("Could not locate the end of the projects array.");
}

function parseProject(block) {
  // Extract known top-level fields from the existing project object.
  const project = {};
  const fields = [
    "slug",
    "title",
    "location",
    "program",
    "summary",
    "image",
    "imageAlt",
    "overview",
    "activities",
    "intendedParticipants",
  ];

  for (const field of fields) {
    const match = block.match(new RegExp(`\\b${field}\\s*:\\s*`));

    if (!match) {
      throw new Error(`Missing project field: ${field}`);
    }

    let start = match.index + match[0].length;
    let end = start;
    const first = block[start];

    if (first === '"' || first === "'") {
      const quote = first;
      let escaped = false;
      end++;

      for (; end < block.length; end++) {
        if (escaped) escaped = false;
        else if (block[end] === "\\") escaped = true;
        else if (block[end] === quote) {
          end++;
          break;
        }
      }
    } else if (first === "[") {
      let depth = 0;
      let quote = null;
      let escaped = false;

      for (; end < block.length; end++) {
        const ch = block[end];

        if (quote) {
          if (escaped) escaped = false;
          else if (ch === "\\") escaped = true;
          else if (ch === quote) quote = null;
          continue;
        }

        if (ch === '"' || ch === "'") quote = ch;
        else if (ch === "[") depth++;
        else if (ch === "]" && --depth === 0) {
          end++;
          break;
        }
      }
    }

    const raw = block.slice(start, end).trim();

    if (first === '"') {
      project[field] = JSON.parse(raw);
    } else if (first === "'") {
      project[field] = raw.slice(1, -1)
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, "\\");
    } else if (first === "[") {
      project[field] = [...raw.matchAll(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g)]
        .map((item) => item[1] !== undefined
          ? JSON.parse(`"${item[1]}"`)
          : item[2].replace(/\\'/g, "'").replace(/\\\\/g, "\\"));
    } else {
      throw new Error(`Unsupported value for project field: ${field}`);
    }
  }

  return project;
}

const source = await readFile(
  path.join(process.cwd(), "lib/projects.ts"),
  "utf8",
);

const projects = extractObjects(source).map(parseProject);

if (projects.length !== 6) {
  throw new Error(
    `Expected six existing projects, found ${projects.length}. No records imported.`,
  );
}

console.log("Projects found in source:");
for (const project of projects) {
  console.log(`- ${project.title} (${project.slug})`);
}

const existing = await sql`SELECT COUNT(*)::int AS total FROM projects`;

if (existing[0].total !== 0) {
  throw new Error(
    `The projects table already contains ${existing[0].total} records. Stopping without importing.`,
  );
}

for (const project of projects) {
  await sql`
    INSERT INTO projects (
      slug, title, location, program, summary,
      image_url, image_alt, overview, activities,
      intended_participants, status, published_at
    )
    VALUES (
      ${project.slug},
      ${project.title},
      ${project.location},
      ${project.program},
      ${project.summary},
      ${project.image},
      ${project.imageAlt},
      ${JSON.stringify(project.overview)}::jsonb,
      ${JSON.stringify(project.activities)}::jsonb,
      ${project.intendedParticipants},
      'published',
      NOW()
    )
  `;
}

const result = await sql`
  SELECT slug, title, status
  FROM projects
  ORDER BY id
`;

console.log(`\nImported ${result.length} projects:`);
for (const project of result) {
  console.log(`${project.status}: ${project.title} (${project.slug})`);
}
