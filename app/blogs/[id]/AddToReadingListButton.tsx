"use client";

import { useTransition } from "react";
import { addToReadingList } from "../../actions/me";

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToReadingList(blogId);
    });
  };

  return (
    <button
      data-testid="add-to-reading-list-button"
      onClick={handleClick}
      disabled={pending}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      {pending ? "adding..." : "add to reading list"}
    </button>
  );
}
