"use server";

import { auth } from "@/auth";
import { sql } from "@/lib/db/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireEditor() {
  const session = await auth();

  if (!session?.user) redirect("/admin/login");

  if (
    session.user.role !== "super_admin" &&
    session.user.role !== "editor"
  ) {
    throw new Error("You do not have permission to manage projects.");
  }
}

function value(form: FormData, key: string, max = 10000) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function parseList(input: string, maxItems = 30, maxLength = 3000) {
  return input
    .split("\n")
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function validate(form: FormData) {
  const title = value(form, "title", 180);
  const slug = slugify(value(form, "slug", 180) || title);
  const location = value(form, "location", 180) || "Mangochi, Malawi";
  const program = value(form, "program", 120);
  const summary = value(form, "summary", 1500);
  const imageUrl = value(form, "image_url", 1000);
  const imageAlt = value(form, "image_alt", 250);
  const overview = parseList(value(form, "overview", 20000), 10, 4000);
  const activities = parseList(value(form, "activities", 12000), 30, 1000);
  const intendedParticipants = value(form, "intended_participants", 1500);
  const status = value(form, "status", 20);

  if (!title || !slug || !program || !summary) {
    throw new Error("Complete the title, slug, program and summary.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Use a valid project slug.");
  }

  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid project status.");
  }

  if (
    imageUrl &&
    !imageUrl.startsWith("/") &&
    !/^https:\/\/[^ ]+$/i.test(imageUrl)
  ) {
    throw new Error("Use a local image path or an HTTPS image URL.");
  }

  return {
    title,
    slug,
    location,
    program,
    summary,
    image_url: imageUrl || null,
    image_alt: imageAlt || title,
    overview,
    activities,
    intended_participants: intendedParticipants,
    status,
  };
}

function refreshProjectPages(oldSlug?: string, newSlug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  if (oldSlug) revalidatePath(`/projects/${oldSlug}`);
  if (newSlug) revalidatePath(`/projects/${newSlug}`);
}

export async function createProject(form: FormData) {
  await requireEditor();
  const project = validate(form);

  const result = await sql`
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
      ${project.image_url},
      ${project.image_alt},
      ${JSON.stringify(project.overview)}::jsonb,
      ${JSON.stringify(project.activities)}::jsonb,
      ${project.intended_participants},
      ${project.status},
      CASE WHEN ${project.status} = 'published' THEN NOW() ELSE NULL END
    )
    RETURNING id
  `;

  refreshProjectPages(undefined, project.slug);
  redirect(`/admin/projects/${result[0].id}/edit?saved=1`);
}

export async function updateProject(form: FormData) {
  await requireEditor();

  const id = value(form, "id", 30);
  if (!/^\d+$/.test(id)) throw new Error("Invalid project ID.");

  const project = validate(form);

  const existing = await sql`
    SELECT slug FROM projects WHERE id = ${id} LIMIT 1
  `;

  if (!existing.length) redirect("/admin/projects?missing=1");

  const oldSlug = String(existing[0].slug);

  await sql`
    UPDATE projects SET
      slug = ${project.slug},
      title = ${project.title},
      location = ${project.location},
      program = ${project.program},
      summary = ${project.summary},
      image_url = ${project.image_url},
      image_alt = ${project.image_alt},
      overview = ${JSON.stringify(project.overview)}::jsonb,
      activities = ${JSON.stringify(project.activities)}::jsonb,
      intended_participants = ${project.intended_participants},
      status = ${project.status},
      published_at = CASE
        WHEN ${project.status} = 'published'
          THEN COALESCE(published_at, NOW())
        ELSE NULL
      END,
      updated_at = NOW()
    WHERE id = ${id}
  `;

  refreshProjectPages(oldSlug, project.slug);
  redirect(`/admin/projects/${id}/edit?saved=1`);
}

export async function changeProjectStatus(form: FormData) {
  await requireEditor();

  const id = value(form, "id", 30);
  const status = value(form, "status", 20);

  if (!/^\d+$/.test(id)) throw new Error("Invalid project ID.");

  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid project status.");
  }

  const existing = await sql`
    SELECT slug FROM projects WHERE id = ${id} LIMIT 1
  `;

  if (!existing.length) redirect("/admin/projects?missing=1");

  await sql`
    UPDATE projects SET
      status = ${status},
      published_at = CASE
        WHEN ${status} = 'published'
          THEN COALESCE(published_at, NOW())
        ELSE NULL
      END,
      updated_at = NOW()
    WHERE id = ${id}
  `;

  refreshProjectPages(String(existing[0].slug));
}

export async function deleteProject(form: FormData) {
  const session = await auth();

  if (!session?.user) redirect("/admin/login");

  if (session.user.role !== "super_admin") {
    throw new Error("Only a super administrator can permanently delete projects.");
  }

  const id = value(form, "id", 30);
  if (!/^\d+$/.test(id)) throw new Error("Invalid project ID.");

  const existing = await sql`
    SELECT slug FROM projects WHERE id = ${id} LIMIT 1
  `;

  if (!existing.length) redirect("/admin/projects?missing=1");

  const slug = String(existing[0].slug);

  await sql`DELETE FROM projects WHERE id = ${id}`;

  refreshProjectPages(slug);
  redirect("/admin/projects?deleted=1");
}
