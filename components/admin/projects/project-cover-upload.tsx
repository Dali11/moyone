"use client";

import {
  useRef,
  useState,
  useEffect,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { ImagePlus, UploadCloud, X, LoaderCircle, CheckCircle2 } from "lucide-react";

type ProjectCoverUploadProps = {
  projectId: string;
  initialImageUrl?: string | null;
  initialAlt?: string | null;
};

const MAX_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ProjectCoverUpload({
  projectId,
  initialImageUrl,
  initialAlt,
}: ProjectCoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(initialImageUrl ?? "");
  const [altText, setAltText] = useState(initialAlt ?? "");
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function selectPreview(file: File) {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  async function upload(file: File) {
    setError("");
    setMessage("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Choose a JPEG, PNG or WebP image.");
      return;
    }

    if (file.size === 0 || file.size > MAX_SIZE) {
      setError("The image must be smaller than 8 MB.");
      return;
    }

    selectPreview(file);
    setBusy(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", altText);

      const response = await fetch(
        `/api/admin/projects/${projectId}/cover`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Image upload failed.");
      }

      setImageUrl(result.imageUrl);
      setPreviewUrl(result.imageUrl);
      setAltText(result.alt || "");
      setMessage("Cover image uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to upload the image.",
      );
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void upload(file);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) void upload(file);
  }

  function clearPreview() {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setImageUrl("");
    setMessage("");
    setError("");
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="image_url" value={imageUrl} />

      <label className="block text-sm font-semibold text-slate-700">
        Image alternative text
        <input
          name="image_alt"
          value={altText}
          onChange={(event) => setAltText(event.target.value)}
          maxLength={250}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-700"
          placeholder="Describe the image for accessibility"
        />
      </label>

      {previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[16/7] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={altText || "Project cover preview"}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={clearPreview}
              disabled={busy}
              aria-label="Remove selected cover"
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-rose-700 shadow hover:bg-white disabled:opacity-50"
            >
              <X size={15} /> Remove
            </button>
          </div>
          <p className="px-4 py-3 text-xs text-slate-500">
            {imageUrl ? "Current saved cover" : "Preview — not uploaded yet"}
          </p>
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
            dragging
              ? "border-emerald-600 bg-emerald-50"
              : "border-slate-300 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50/50"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
            <UploadCloud size={27} />
          </div>
          <p className="mt-4 font-bold text-slate-900">
            Drag and drop your cover image here
          </p>
          <p className="mt-2 text-sm text-slate-500">
            or click to browse your computer
          </p>
          <p className="mt-3 text-xs text-slate-400">
            JPEG, PNG or WebP · Maximum 8 MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onFileChange}
        className="sr-only"
        aria-label="Choose project cover image"
      />

      {previewUrl && (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-xl border border-dashed p-4 ${
            dragging
              ? "border-emerald-600 bg-emerald-50"
              : "border-slate-200"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ImagePlus size={18} className="text-emerald-700" />
              Drop a new image here to replace the current cover.
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
            >
              Choose another
            </button>
          </div>
        </div>
      )}

      {busy && (
        <p className="flex items-center gap-2 text-sm text-emerald-800">
          <LoaderCircle size={17} className="animate-spin" />
          Uploading image…
        </p>
      )}

      {message && (
        <p className="flex items-center gap-2 text-sm text-emerald-800">
          <CheckCircle2 size={17} />
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">
          {error}
        </p>
      )}
    </div>
  );
}
