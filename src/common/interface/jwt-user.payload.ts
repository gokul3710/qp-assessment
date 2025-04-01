import { JwtPayload } from 'jsonwebtoken';

export interface userJwtPayload extends JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
  email: string;
}
