export enum APIErrorEnum {
  UNAUTHORIZED = 'unauthorized',
  INVALID_CREDENTIAL = 'invalid_credentials'
}
export interface APIError {
  type: APIErrorEnum;
  message: string;
}
