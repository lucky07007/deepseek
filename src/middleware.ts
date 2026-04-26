// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired
  await supabase.auth.getSession()
  
  return res
}

// Specify which routes to run middleware on
export const config = {
  matcher: [
    '/profile/:path*',
    '/internships/:path*/apply',
    '/auth/callback',
  ],
}
