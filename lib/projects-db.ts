import { sql } from "@/lib/db/client";
import type { Project } from "@/lib/projects";

async function withReadRetry<T>(
  query: () => Promise<T>,
): Promise<T> {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await query();
    } catch (error) {
      const details: string[] = [];
      let current: unknown = error;

      for (let depth = 0; depth < 5 && current; depth++) {
        if (current instanceof Error) {
          details.push(current.message);
          current = "cause" in current ? current.cause : undefined;
        } else {
          details.push(String(current));
          break;
        }
      }

      const message = details.join(" ").toLowerCase();
      const transient = [
        "fetch failed",
        "etimedout",
        "econnreset",
        "eai_again",
        "ehostunreach",
        "enetwork",
      ].some((term) => message.includes(term));

      if (!transient || attempt === maxAttempts) {
        throw error;
      }

      const delay = attempt * 700;
      console.warn(
        `Transient database read failure. Retrying in ${delay}ms (attempt ${attempt + 1}/${maxAttempts}).`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Database read failed after retries.");
}

type ProjectRecord = {
  slug: string;
  title: string;
  location: string;
  program: string;
  summary: string;
  image_url: string | null;
  image_alt: string | null;
  overview: unknown;
  activities: unknown;
  intended_participants: string | null;
};

function stringList(value: unknown): string[] {
  let parsed = value;

  if (typeof parsed === "string") {
    const original = parsed;

    try {
      parsed = JSON.parse(original);
    } catch {
      const text = original.trim();
      return text ? [text] : [];
    }
  }

  if (!Array.isArray(parsed)) return [];

  return parsed.filter(
    (item): item is string => typeof item === "string",
  );
}

function toProject(record: ProjectRecord): Project {
  return {
    slug: record.slug,
    title: record.title,
    location: record.location,
    program: record.program,
    summary: record.summary,
    image: record.image_url || "/images/moyone-logo.png",
    imageAlt: record.image_alt || record.title,
    overview: stringList(record.overview),
    activities: stringList(record.activities),
    intendedParticipants: record.intended_participants || "",
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const rows = (await withReadRetry(() => sql`
    SELECT
      slug,
      title,
      location,
      program,
      summary,
      image_url,
      image_alt,
      overview,
      activities,
      intended_participants
    FROM projects
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `)) as ProjectRecord[];

  return rows.map(toProject);
}

export async function getPublishedProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const rows = (await withReadRetry(() => sql`
    SELECT
      slug,
      title,
      location,
      program,
      summary,
      image_url,
      image_alt,
      overview,
      activities,
      intended_participants
    FROM projects
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `)) as ProjectRecord[];

  return rows.length ? toProject(rows[0]) : undefined;
}
