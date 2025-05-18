import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    returnTo: '/dashboard'
  });
export const POST = handleAuth();
