"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export type RegisterFormState = {
  error: string;
  errors?: Record<string, string>;
};

export const registerUser = async (
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = ((formData.get("username") as string) ?? "").trim();
  const name = ((formData.get("name") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";
  const passwordConfirm = (formData.get("passwordConfirm") as string) ?? "";

  const errors: Record<string, string> = {};
  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }
  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  const existing = username
    ? await db.query.users.findFirst({
        where: eq(users.username, username),
      })
    : null;
  if (existing) {
    errors.username = "Username is already taken";
  }

  if (Object.keys(errors).length > 0) {
    return { error: "Validation failed", errors };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
  redirect("/login");
};
