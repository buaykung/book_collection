import { NextApiRequest, NextApiResponse } from 'next';
import { AuthPayload } from './verifyJWT';

export const roleGuard =
  (roles: ('admin' | 'author')[]) =>
  (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const user = (req as any).user as AuthPayload;
    if (!user || !roles.includes(user.role))
      return res.status(403).json({ message: 'Forbidden' });
    next()
  };