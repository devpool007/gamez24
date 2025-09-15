"use client";

import { User } from "lucide-react";
import Link from "next/link";

export function UserHeader() {
  return (
    <Link
      href="/user"
      className="inline-flex size-10 items-center justify-center rounded-full cursor-pointer hover:bg-accent hover:text-accent-foreground"
    >
      <User className="w-5 h-5" />
    </Link>
  );
}
