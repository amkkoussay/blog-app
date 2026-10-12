"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog } from "@/app/services/blogs";

export type BlogFormState = {
  error: string;
  errors?: Record<string, string>;
  values?: { title: string; author: string; url: string };
  success?: boolean;
};

const initialValues = { title: "", author: "", url: "" };

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = (formData.get("title") as string)?.trim() ?? "";
  const author = (formData.get("author") as string)?.trim() ?? "";
  const url = (formData.get("url") as string)?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { error: "Validation failed", errors, values: { title, author, url } };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { error: "", values: initialValues, success: true };
};
