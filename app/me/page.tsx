export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { getCurrentUser } from "@/app/services/session";
import { markAsRead } from "@/app/actions/me";
import TokenSection from "./TokenSection";

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const entries = await db
    .select({
      id: readingList.id,
      read: readingList.read,
      blogId: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, user.id));

  const unread = entries.filter((e) => !e.read);
  const read = entries.filter((e) => e.read);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My page</h1>

      <section data-testid="user-profile" className="mb-8 border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <p>
          Name: <span data-testid="user-name">{user.name}</span>
        </p>
        <p>
          Username: <span data-testid="user-username">{user.username}</span>
        </p>
      </section>

      <TokenSection token={user.token} />

      <section data-testid="reading-list-section" className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reading list</h2>

        <div data-testid="unread-section" className="mb-6">
          <h3 className="text-lg font-medium mb-2">Unread</h3>
          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs" className="text-gray-500">
              No unread blogs.
            </p>
          ) : (
            <ul className="space-y-2">
              {unread.map((e) => (
                <li
                  key={e.id}
                  className="border rounded p-3 flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{e.title}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      by {e.author}
                    </span>
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await markAsRead(e.blogId);
                    }}
                  >
                    <button
                      type="submit"
                      data-testid={`mark-read-${e.blogId}`}
                      className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 text-sm"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-testid="read-section" className="mb-6">
          <h3 className="text-lg font-medium mb-2">Read</h3>
          {read.length === 0 ? (
            <p data-testid="empty-reading-list" className="text-gray-500">
              No blogs in reading list yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {read.map((e) => (
                <li key={e.id} className="border rounded p-3">
                  <span className="font-medium">{e.title}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    by {e.author}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
