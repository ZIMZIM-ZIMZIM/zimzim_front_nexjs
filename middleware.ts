import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/auth/login', req.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'], // '/user'로 시작하는 모든 경로에 대해 미들웨어 적용
};
