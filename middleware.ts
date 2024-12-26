import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protection de la route admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const hasAccess = request.cookies.get('admin_access');
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
};