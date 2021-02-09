import qs from 'qs';
import { buildUrl } from './buildUrl';
import type { NextApiResponse, NextApiRequest } from 'next';

export type RedirectOption = string | {
  url: string;
  query: Record<string, any>;
};

export type RedirectOptions = {
  redirectTo: RedirectOption;
  statusCode?: number;
  errorCode?: string;
  useQueryParam?: boolean;
}

export function redirect(req: NextApiRequest, res: NextApiResponse, options: RedirectOptions) {
  const statusCode = options.statusCode ?? 200;
  const redirectTo = options.redirectTo;

  const fromQuery = options.useQueryParam !== false ? (req.query.redirect_uri as string | undefined) : undefined;
  let url = typeof redirectTo === 'string' ? redirectTo : redirectTo.url;
  let query = typeof redirectTo === 'string' ? {} : redirectTo.query;
  if (fromQuery) {
    const split = fromQuery.split('?');
    url = split[0];
    query = {
      ...query,
      ...(split.length > 1 ? qs.parse(split[1]) : {}),
    };
  }

  res.statusCode = 303;
  res.setHeader('Location', buildUrl(url, {
    ...query,
    ...((statusCode >= 400) ? { statusCode: statusCode } : {}),
    ...(options.errorCode ? { errorCode: options.errorCode } : {}),
  }));
  return res.end();
}