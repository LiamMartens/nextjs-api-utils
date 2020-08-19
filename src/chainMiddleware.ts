import type { NextApiResponse, NextApiRequest } from 'next';

type NextFunc = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
type MiddlewareFunc = (req: NextApiRequest, res: NextApiResponse, next: NextFunc) => Promise<void>;
export const chainMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: MiddlewareFunc[],
  next: NextFunc,
) => {
  if (middleware.length === 1) {
    await middleware[0](req, res, next);
  } else {
    await middleware[0](req, res, async (req, res) => {
      await chainMiddleware(req, res, middleware.slice(1), next);
    });
  }
}