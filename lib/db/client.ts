import { neon } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "Missing DATABASE_URL_POOLED or DATABASE_URL environment variable."
    );
  }

  return url;
}

export const sql = neon(getDatabaseUrl());
