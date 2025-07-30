import { NextApiRequest } from 'next';
import { AuthPayload } from '../middleware/verifyJWT';

export interface CustomNextApiRequest extends NextApiRequest {
  user?: AuthPayload;
}