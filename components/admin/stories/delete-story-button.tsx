"use client";

import { useState } from "react";
import { deleteStory } from "@/lib/admin/story-actions";

export function DeleteStoryButton({
  id,
  title,
}: {
  id: string | number;
  title: string;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <form
      action={deleteStory}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Permanently delete "${title}"?\n\nThis cannot be undone. Its gallery records and stored images will also be removed.`
        );

        if (!confirmed) {
          event.preventDefault();
          return;
        }

        setBusy(true);
      }}
    >
      <input type="hidden" name="id" value={String(id)} />
      <button
        type="submit"
        disabled={busy}
        className="font-semibold text-rose-700 hover:underline disabled:opacity-50"
      >
        {busy ? "Deleting…" : "Delete"}
      </button>
    </form>
  );
}
