export type ApiResponse<B = {}, M = {}> = {
  success: true;
  data: B;
  meta: {
    time: string;
  } & M;
} | {
  success: false;
  errorCode: string;
  data: B;
  meta: {
    time: string;
  } & M;
};