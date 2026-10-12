"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex items-center gap-4">
      <Link href="/" className="font-bold text-lg hover:text-slate-300">
        Blog app
      </Link>
      <span className="text-slate-500">|</span>
      <Link href="/blogs" className="hover:text-slate-300">
        blogs
      </Link>
      <span className="text-slate-500">|</span>
      <Link href="/users" className="hover:text-slate-300">
        users
      </Link>
      <span className="text-slate-500">|</span>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/blogs/new" className="hover:text-slate-300">
              create new
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/me" className="hover:text-slate-300">
              me
            </Link>
            <span className="text-slate-400 text-sm">
              {session.user?.name} logged in
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-slate-600 hover:bg-slate-500 rounded px-3 py-1 text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-slate-300">
              login
            </Link>
            <span className="text-slate-500">|</span>
            <Link href="/register" className="hover:text-slate-300">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
