import { HttpMethod } from './constants';
import { errorHandlers } from './errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';


export const isMethod = (method: HttpMethod) => async (req: NextApiRequest, res: NextApiResponse, next: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  if (req.method === method) {
    return await next(req, res);
  }
  return errorHandlers.isMethod(req, res);
}