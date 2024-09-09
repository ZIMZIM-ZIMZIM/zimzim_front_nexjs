import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const acceptLanguage = req.headers.get('accept-language');
  const defaultLocale = 'ko';
  let locale = defaultLocale;

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (['en', 'ko'].includes(preferredLocale)) {
      locale = preferredLocale;
    }
  }

  if (!nextUrl.pathname.startsWith(`/${locale}`)) {
    const url = new URL(`/${locale}${nextUrl.pathname}`, req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*'],
};
