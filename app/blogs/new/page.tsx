"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, type BlogFormState } from "../../actions/blogs";
import { useNotification } from "../../components/NotificationContext";

const initialState: BlogFormState = {
  error: "",
  values: { title: "", author: "", url: "" },
  success: false,
};

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created", "success");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a new blog</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={state.values?.title}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.title && (
            <p data-testid="title-error" className="text-red-600 text-sm mt-1">
              {state.errors.title}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={state.values?.author}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.author && (
            <p data-testid="author-error" className="text-red-600 text-sm mt-1">
              {state.errors.author}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={state.values?.url}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors?.url && (
            <p data-testid="url-error" className="text-red-600 text-sm mt-1">
              {state.errors.url}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Create
        </button>
        {state.error && (
          <p className="text-red-600 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
}
