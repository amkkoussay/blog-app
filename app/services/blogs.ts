import { eq, ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
  if (filter) {
    const pattern = `%${filter}%`;
    return db.query.blogs.findMany({
      where: or(ilike(blogs.title, pattern), ilike(blogs.author, pattern)),
    });
  }
  return db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const [blog] = await db
    .insert(blogs)
    .values({ title, author, url, userId: user.id })
    .returning();
  // Each blog the user adds is added to their reading list by default
  await db.insert(readingList).values({ userId: user.id, blogId: blog.id });
  return blog;
};

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }
  await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id));
};

export const getUsers = async () => {
  return db.query.users.findMany({
    columns: { id: true, username: true, name: true },
  });
};
