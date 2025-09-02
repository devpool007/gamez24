import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest): NextResponse {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Get country from various possible headers with proper typing
  const country: string = 
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    'DE';
  
  // Add country to headers so it's available in your app
  requestHeaders.set('x-user-country', country);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};