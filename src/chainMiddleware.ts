import type { NextApiResponse, NextApiRequest } from 'next';

type NextFunc<RQ extends NextApiRequest = NextApiRequest, RS extends NextApiResponse = NextApiResponse> = (req: RQ, res: RS) => Promise<void>;
type MiddlewareFunc<RQ extends NextApiRequest = NextApiRequest, RS extends NextApiResponse = NextApiResponse> = (req: RQ, res: RS, next: NextFunc) => Promise<void>;
export const chainMiddleware = async <RQ extends NextApiRequest = NextApiRequest, RS extends NextApiResponse = NextApiResponse>(
  req: RQ,
  res: RS,
  middleware: MiddlewareFunc<RQ, RS>[],
  next: NextFunc<RQ, RS>,
) => {
  if (middleware.length === 1) {
    await middleware[0](req, res, next);
  } else {
    await middleware[0](req, res, async (req, res) => {
      await chainMiddleware(req, res, middleware.slice(1), next);
    });
  }
}