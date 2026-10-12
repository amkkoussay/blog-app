export const dynamic = "force-dynamic";

import Link from "next/link";
import { getBlogs } from "../services/blogs";
import BlogFilter from "./BlogFilter";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <BlogFilter initialFilter={filter ?? ""} />
      <div data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {blog.title}
            </Link>
            <span className="ml-2 text-sm text-gray-600">by {blog.author}</span>
            <span className="ml-2 text-sm text-gray-500">
              {blog.likes} likes
            </span>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
