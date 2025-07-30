import { NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { CustomNextApiRequest } from '../types/customRequest';
// import { CustomNextApiRequest } from '@/types/customRequest';

export interface AuthPayload {
  id: number
  username: string
  role: 'admin' | 'author'
}

export function verifyJWT(
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const token = req.cookies['access_token']
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const payload = verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload
    req.user = payload
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}