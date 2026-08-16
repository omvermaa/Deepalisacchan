"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CldUploadWidget } from "next-cloudinary";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function RichTextEditor({ onSuccess, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [images, setImages] = useState(initialData?.images || []);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (result) => {
    if (result.event === "success") {
      setImages((prev) => [...prev, result.info.secure_url]);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Basic slug generation from title (avoid resetting if it's already an existing valid slug unless changed significantly)
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      
      const slug = initialData?.slug || newSlug;

      const method = initialData ? "PUT" : "POST";
      const apiUrl = initialData ? `/api/blogs/${initialData._id}` : "/api/blogs";

      const res = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          images,
          seoTitle: seoTitle || title,
          seoDescription,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (!initialData) {
          setTitle("");
          setContent("");
          setImages([]);
          setSeoTitle("");
          setSeoDescription("");
        }
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || "Failed to save blog post");
      }
    } catch (err) {
      setError("An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900"
          placeholder="e.g. Top 5 Foods in Thyroid"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Blog Content</label>
        <div className="bg-white rounded-lg border border-slate-300 overflow-hidden text-slate-900">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-64 sm:h-96 text-slate-900"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">Images (Carousel)</label>
        <div className="flex flex-wrap gap-4">
          {images.map((url, i) => (
            <div key={i} className="relative group w-32 h-32 rounded-lg border border-slate-200 overflow-hidden">
              <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "deepaliblog"}
            onSuccess={handleUpload}
            options={{ multiple: true }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
              >
                <ImageIcon className="h-8 w-8 mb-2" />
                <span className="text-xs font-medium text-center px-2">Upload Photo</span>
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">SEO Settings</h3>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">SEO Title (Optional)</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="block w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900"
            placeholder="Defaults to Blog Title"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">SEO Description</label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
            className="block w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900"
            placeholder="Brief description for search engines"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !title || !content}
          className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Publish Blog Post</span>
          )}
        </button>
      </div>
    </form>
  );
}
