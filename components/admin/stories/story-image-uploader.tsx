"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, LoaderCircle, UploadCloud, X } from "lucide-react";

type UploadedImage = {
  id: number | string;
  object_key: string;
  alt_text: string;
  caption: string;
  sort_order: number;
};

type Props = {
  storyId: number | string;
  initialImages?: UploadedImage[];
};

const MAX_SIZE = 8 * 1024 * 1024;

export function StoryImageUploader({
  storyId,
  initialImages = [],
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(initialImages);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      try {
        const response = await fetch(
          `/api/admin/stories/${storyId}/images`,
          { cache: "no-store" }
        );
        if (!response.ok) return;

        const result = await response.json();
        if (!cancelled && Array.isArray(result.images)) {
          setImages(result.images);
        }
      } catch {
        if (!cancelled) {
          setMessage("Could not load saved gallery images.");
        }
      }
    }

    loadImages();
    return () => {
      cancelled = true;
    };
  }, [storyId]);

  function selectFiles(selected: FileList | null) {
    if (!selected) return;

    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const file of Array.from(selected)) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        rejected.push(`${file.name}: use JPEG, PNG or WebP.`);
      } else if (file.size > MAX_SIZE || file.size === 0) {
        rejected.push(`${file.name}: maximum size is 8 MB.`);
      } else {
        accepted.push(file);
      }
    }

    const nextFiles = [...files, ...accepted];
    setFiles(nextFiles);
    setPreviews(nextFiles.map((file) => URL.createObjectURL(file)));
    setMessage(rejected.join(" "));
  }

  function removePending(index: number) {
    URL.revokeObjectURL(previews[index]);
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  }

  async function uploadFiles() {
    if (!files.length || busy) return;

    setBusy(true);
    setMessage("");

    const remaining: File[] = [];

    try {
      for (const file of files) {
        const form = new FormData();
        form.append("storyId", String(storyId));
        form.append("file", file);

        const response = await fetch("/api/admin/stories/images", {
          method: "POST",
          body: form,
        });

        const result = await response.json();

        if (!response.ok) {
          remaining.push(file);
          setMessage(result.error || `Could not upload ${file.name}.`);
          continue;
        }

        setImages((current) => [...current, result.image]);
      }

      previews.forEach(URL.revokeObjectURL);
      setFiles(remaining);
      setPreviews(remaining.map((file) => URL.createObjectURL(file)));

      if (!remaining.length) {
        setMessage("All images uploaded successfully.");
      }
    } catch {
      setMessage("Connection error. Please try uploading again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Additional gallery images</h2>
        <p className="mt-1 text-sm text-slate-500">
          These photographs appear below the story content, separate from the cover. JPEG, PNG and WebP, up to
          8 MB per image.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(event) => {
          selectFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          selectFiles(event.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragging
            ? "border-brand-700 bg-brand-50"
            : "border-slate-300 bg-slate-50 hover:border-brand-600 hover:bg-brand-50/50"
        }`}
      >
        <UploadCloud className="mx-auto h-9 w-9 text-brand-800" />
        <p className="mt-3 font-semibold text-slate-900">
          Drop your photos here or click to browse
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Select multiple images at once
        </p>
      </div>

      {previews.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Ready to upload ({files.length})
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {previews.map((src, index) => (
              <div
                key={`${files[index]?.name}-${index}`}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <img
                  src={src}
                  alt={files[index]?.name || "Selected photo"}
                  className="h-36 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePending(index)}
                  aria-label="Remove selected image"
                  className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-700 shadow hover:text-red-600"
                >
                  <X size={16} />
                </button>
                <p className="truncate px-2 py-2 text-xs text-slate-600">
                  {files[index]?.name}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={uploadFiles}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white hover:bg-brand-900 disabled:opacity-60"
          >
            {busy ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <ImagePlus size={17} />
            )}
            {busy ? "Uploading images…" : `Upload ${files.length} image(s)`}
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Uploaded images ({images.length})
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="relative h-36 bg-slate-100">
                  <img
                    src={`/api/media/gallery/${image.id}`}
                    alt={image.alt_text || "Story gallery photograph"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand-800 shadow">
                    Gallery image
                  </span>
                </div>
                <p className="break-all px-3 py-2 text-xs text-slate-600">
                  {image.object_key.split("/").pop()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && (
        <p aria-live="polite" className="text-sm text-slate-700">
          {message}
        </p>
      )}
    </section>
  );
}
