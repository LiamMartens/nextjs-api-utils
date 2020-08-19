import { redirectOrAnswer } from './redirectOrAnswer';
import { ErrorCodes, DefaultRedirectPath } from './constants';
import type { NextApiRequest, NextApiResponse } from 'next';

export let errorHandlers = {
  default: (req: NextApiRequest, res: NextApiResponse, error?: any) => { console.error(error); },
  attempt: (req: NextApiRequest, res: NextApiResponse, error?: any) => {
    errorHandlers.default(req, res, error);
    return redirectOrAnswer(req, res, {
      statusCode: 500,
      errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
      redirectTo: DefaultRedirectPath
    });
  },
  isMethod: (req: NextApiRequest, res: NextApiResponse, error?: any) => {
    errorHandlers.isMethod(req, res, error);
    return redirectOrAnswer(req, res, {
      statusCode: 405,
      redirectTo: DefaultRedirectPath,
      errorCode: ErrorCodes.METHOD_NOT_ALLOWED,
    });
  }
};
export const setDefaultErrorHandler = (handler: typeof errorHandlers['default']) => errorHandlers.default = handler;
export const setAttemptErrorHandler = (handler: typeof errorHandlers['attempt']) => errorHandlers.attempt = handler;
export const setIsMethodErrorHandler = (handler: typeof errorHandlers['isMethod']) => errorHandlers.isMethod = handler;