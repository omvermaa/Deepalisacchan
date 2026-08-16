import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-local-key-for-dev'
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths requiring authentication
  const requireAuth = pathname.startsWith('/admin/dashboard') || 
                      (pathname.startsWith('/api/blogs') && request.method !== 'GET'); 
                      // Protect POST/PUT/DELETE /api/blogs

  if (requireAuth) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error('Invalid token', err);
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Redirect authenticated users away from the login page
  if (pathname === '/admin') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (err) {
        // invalid token, just render login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/blogs/:path*'],
};
