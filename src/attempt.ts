import { errorHandlers } from './errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

export const attempt = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  try {
    await next(req, res);
  } catch (err) {
    errorHandlers.attempt(req, res, err);
  }
}
