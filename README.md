# nextjs-api-utils
This package contains some API utilities to be used with Next.js

## Utilities
### chainMiddleware
This utility can be used to chain express like middleware. Usage is as follows
```js
import { chainMiddleware } from 'nextjs-api-utils';

export default async (req, res) => {
  await chainMiddleware(req, res, [
    /** middleware functions */
  ], async (req, res) => {
    /** actual API request body */
  });
}
```
### answer
This function can be used to generate a standardized answer from a next.js API route. It can be used as follows:
```js
import { answer, ErrorCodes } from 'nextjs-api-utils';

export default (req, res) => {
  return answer(req, res, {
    statusCode: 400,
    errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
    data: { foo: 'bar' },
    meta: { foo: 'baz' }
  });
}
```
This will result in the HTTP request returning a `400` status code and the following body
```json
{
  "success": false,
  "errorCode": "internal_server_error",
  "data": { "foo": "bar" },
  "meta": {
    "time": "2021-02-09T17:23:35.775Z",
    "foo": "baz"
  }
}
```

### redirect
This method can be used to redirect to a new page from an API request.
```js
import { redirect, ErrorCodes } from 'nextjs-api-utils';

export default (req, res) => {
  return redirect(req, res, {
    redirectTo: {
      url: '/',
      query: { foo: 'bar' }
    },
    statusCode: 400,
    errorCode: ErrorCodes.BAD_REQUEST,
  });
}
```
This will redirect the user using a `303` HTTP status to the following path `/?foo=bar&statusCode=400&errorCode=bad_request`. The additional query parameters are added as this is intended to be used when an API request fails when directly accessed by a user.

### redirectOrAnswer
This method is a combination of `answer` and `redirect`. It will use the normalized answer when a `accept` header is present containing `application/json`. Otherwise it will redirect the user using the provided parameters. Usage is almost identical to the `answer` method with the addition of the `redirectTo`, `onBeforeAnswer` and `onBeforeRedirect` options.

## Middlewares
For usage with `chainMiddleware`.

### attempt
This middleware will wrap the API body in a `try-catch` statement. Upon failing it will use `redirectOrAnswer` with a status code of `500`. The "on error" behavior of this can be customized by calling `setAttemptErrorHandler`.

```js
import { setAttemptErrorHandler, redirectOrAnswer } from 'nextjs-api-utils';
setAttemptErrorHandler((req, res, error) => {
  return redirectOrAnswer({ ... })
});
```

### isMethod
This middleware can be used to check the incoming HTTP method before executing the API body. The on fail behavior of this middleware can be customized using `setIsMethodErrorHandler`