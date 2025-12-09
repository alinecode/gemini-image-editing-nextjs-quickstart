import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    const validUser = process.env.AUTH_USER || 'default_user';
    const validPwd = process.env.AUTH_PASSWORD || 'default_password';

    if (user === validUser && pwd === validPwd) {
      return NextResponse.next();
    }
  }
  return new NextResponse('Authorization required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
