import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").notNull(),
});

export const readingList = pgTable("reading_list", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  blogId: integer("blog_id").notNull(),
  read: boolean("read").notNull().default(false),
});

export type User = typeof users.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type ReadingListEntry = typeof readingList.$inferSelect;
