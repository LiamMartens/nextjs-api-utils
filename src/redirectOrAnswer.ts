import { AnswerOptions, answer } from './answer';
import { redirect, RedirectOption } from './redirect';
import type { NextApiResponse, NextApiRequest } from 'next';

type RedirectOrAnswerOptions<D, M> = AnswerOptions<D, M> & {
  redirectTo: RedirectOption;
  onBeforeRedirect?: () => Promise<void>;
  onBeforeAnswer?: () => Promise<void>;
};

export async function redirectOrAnswer<D = any, M = any>(req: NextApiRequest, res: NextApiResponse, {
  redirectTo,
  onBeforeAnswer,
  onBeforeRedirect,
  ...answerOptions
}: RedirectOrAnswerOptions<D, M>) {
  const accept = (req.headers.accept || '').split(',');
  const allowJson = accept.includes('application/json');
  if (!allowJson) {
    if (onBeforeRedirect) await onBeforeRedirect();
    return redirect(req, res, {
      redirectTo,
      statusCode: answerOptions.statusCode,
      errorCode: answerOptions.errorCode,
    });
  } else {
    if (onBeforeAnswer) await onBeforeAnswer();
    return answer(req, res, answerOptions);
  }
}