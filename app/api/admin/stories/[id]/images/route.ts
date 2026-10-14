import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }

  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid story ID." }, { status: 400 });
  }

  try {
    const images = await sql`
      SELECT id, object_key, alt_text, caption, sort_order
      FROM story_images
      WHERE story_id = ${id}
      ORDER BY sort_order ASC, id ASC
    `;

    return NextResponse.json({ images });
  } catch (error) {
    console.error(
      "Unable to retrieve story gallery:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Unable to retrieve gallery." },
      { status: 500 }
    );
  }
}
