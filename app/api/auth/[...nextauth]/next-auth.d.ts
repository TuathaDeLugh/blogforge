import { CustomUser } from './options';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }
}