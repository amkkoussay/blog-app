export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getBlogById, likeBlog } from "../../services/blogs";
import { getCurrentUser } from "../../services/session";
import AddToReadingListButton from "./AddToReadingListButton";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const owner = await db.query.users.findFirst({
    where: eq(users.id, blog.userId),
    columns: { name: true },
  });

  const handleLike = async () => {
    "use server";
    await likeBlog(blog.id);
  };

  const isOwner = user?.id === blog.userId;

  return (
    <div data-testid="blog-detail" className="max-w-2xl">
      <h1 data-testid="blog-title" className="text-3xl font-bold mb-2">
        {blog.title}
      </h1>
      <p data-testid="blog-author" className="text-gray-600 mb-4">
        by {blog.author}
        {owner ? ` (added by ${owner.name})` : ""}
      </p>
      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all"
      >
        {blog.url}
      </a>
      <div className="mt-4 flex items-center gap-3">
        <span data-testid="blog-likes">{blog.likes} likes</span>
        <form action={handleLike}>
          <button
            type="submit"
            className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-sm"
          >
            like
          </button>
        </form>
      </div>
      {user && !isOwner && <AddToReadingListButton blogId={blog.id} />}
      <div className="mt-6">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    </div>
  );
}
