import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { login } from './services/auth';
import { AUTH_URL, BASE_APP_URL, PROTECTED_ROUTES } from './constants/urls';

export const middleware = async (req: NextRequest) => {
  const apiKey = req.cookies.get('apiKey');
  const { pathname, origin } = req.nextUrl;

  if (!apiKey) {
    return PROTECTED_ROUTES.includes(pathname)
      ? NextResponse.redirect(new URL(AUTH_URL, origin))
      : NextResponse.next();
  }

  try {
    if (await login(apiKey.value)) {
      return pathname === AUTH_URL
        ? NextResponse.redirect(new URL(BASE_APP_URL, origin))
        : NextResponse.next();
    }

    return PROTECTED_ROUTES.includes(pathname)
      ? NextResponse.redirect(new URL(AUTH_URL, origin))
      : NextResponse.next();
  } catch {
    return PROTECTED_ROUTES.includes(pathname)
      ? NextResponse.redirect(new URL(AUTH_URL, origin))
      : NextResponse.next();
  }
};
