"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";

export function ReplaceCoverImage({
  storyId,
  currentImage,
  currentAlt,
}: {
  storyId: string | number;
  currentImage: string;
  currentAlt: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(currentImage);
  const [alt, setAlt] = useState(currentAlt);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function choose(selected: File | undefined) {
    if (!selected) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type) ||
        selected.size === 0 || selected.size > 8 * 1024 * 1024) {
      setMessage("Choose a JPEG, PNG or WebP image up to 8 MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  }

  async function upload() {
    if (!file || busy) return;
    setBusy(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("altText", alt);

      const response = await fetch(`/api/admin/stories/${storyId}/cover`, {
        method: "POST",
        body: form,
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not replace the cover.");
        return;
      }

      setImage(`${result.imageUrl}?updated=${Date.now()}`);
      setAlt(result.alt);
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      setMessage("Cover image replaced. Gallery images were not changed.");
    } catch {
      setMessage("Upload failed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50/40 p-5">
      <h3 className="text-base font-bold text-slate-900">Replace cover image</h3>
      <p className="mt-1 text-sm text-slate-600">
        Changes only the main image at the top of this story. Additional gallery images remain untouched.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-[220px_1fr]">
        <img
          src={preview || image || "/images/projects/back-to-school-concept.png"}
          alt="Cover preview"
          className="h-36 w-full rounded-xl border border-slate-200 bg-white object-cover"
        />

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Cover alternative text
            <input
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              maxLength={250}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
              placeholder="Describe the cover photograph"
            />
          </label>

          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => choose(event.target.files?.[0])}
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ImagePlus size={16} /> Choose new cover
            </button>

            {file && (
              <button
                type="button"
                disabled={busy}
                onClick={upload}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-800 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
              >
                {busy && <LoaderCircle size={16} className="animate-spin" />}
                {busy ? "Uploading…" : "Save new cover"}
              </button>
            )}
          </div>
          {file && <p className="text-xs text-slate-500">{file.name}</p>}
          {message && <p aria-live="polite" className="text-sm text-slate-700">{message}</p>}
        </div>
      </div>
    </section>
  );
}
