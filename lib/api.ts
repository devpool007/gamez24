// lib/api.ts
export async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, string | number>
): Promise<T> {

  // const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

    // Debug: Log the exact URL being called
  // console.log("🚀 Making request to:", fullUrl);
  // console.log("🍪 Document cookies:", document.cookie);
  const res = await fetch(`/api${endpoint}`, {
    
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // allow cookies if backend uses them
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
