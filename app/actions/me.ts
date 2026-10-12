"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, readingList } from "@/db/schema";
import { getCurrentUser } from "@/app/services/session";

export const generateToken = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const token = crypto.randomUUID();
  await db.update(users).set({ token }).where(eq(users.id, user.id));
  revalidatePath("/me");
  return token;
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  });
  if (!existing) {
    await db.insert(readingList).values({ userId: user.id, blogId });
  }
  revalidatePath("/me");
};

export const markAsRead = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  });
  if (entry) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(eq(readingList.id, entry.id));
  }
  revalidatePath("/me");
};
