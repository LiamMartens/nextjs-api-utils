import type { NextApiResponse, NextApiRequest } from 'next';

export type AnswerOptions<D, M> = {
  statusCode: number;
  errorCode?: string;
  data?: D;
  meta?: M;
}

export function answer<D = any, M = any>(req: NextApiRequest, res: NextApiResponse, {
  statusCode,
  errorCode,
  data,
  meta,
}: AnswerOptions<D, M>) {
  const responseObject = {
    success: !errorCode,
    ...(!!errorCode ? { errorCode } : {}),
    ...(!!data ? { data } : {}),
    meta: {
      time: (new Date()).toISOString(),
      ...(!!meta ? { meta } : {}),
    }
  };
  return res.status(statusCode).send(responseObject);
}