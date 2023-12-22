import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { login } from './services/auth';
import { parseCookie } from './utils/cookies';
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
    const { isAuth, apiKeyCookie } = await login(apiKey.value);

    if (isAuth) {
      const response =
        pathname === AUTH_URL
          ? NextResponse.redirect(new URL(BASE_APP_URL, origin))
          : NextResponse.next();

      if (apiKeyCookie) {
        const { apiKey, ...rest } = parseCookie(apiKeyCookie);
        response.cookies.set({ name: 'apiKey', value: apiKey as string, ...rest });
      }

      return response;
    }

    const response = PROTECTED_ROUTES.includes(pathname)
      ? NextResponse.redirect(new URL(AUTH_URL, origin))
      : NextResponse.next();
    response.cookies.delete('apiKey');

    return response;
  } catch {
    return PROTECTED_ROUTES.includes(pathname)
      ? NextResponse.redirect(new URL(AUTH_URL, origin))
      : NextResponse.next();
  }
};
