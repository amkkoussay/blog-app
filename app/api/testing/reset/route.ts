import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { users, blogs, readingList } from "@/db/schema";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);
  // Reset serial sequences so ids start from 1 again
  await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE blogs_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE reading_list_id_seq RESTART WITH 1`);
  return NextResponse.json({ success: true });
};
