// app/actions/setCurrency.ts
"use server";

import { cookies } from "next/headers";

export async function setCurrency(currencyCode: string) {
  const cookieStore = await cookies();

  cookieStore.set("currencyCode", currencyCode, {
    path: "/", // cookie available everywhere
    httpOnly: true, // client-side JS can read it if you need
    sameSite: "lax",
  });
}
