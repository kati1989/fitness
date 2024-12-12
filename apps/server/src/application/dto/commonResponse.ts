export interface CommonResponse<T> {
  data?: T;
  errors: string[];
}
