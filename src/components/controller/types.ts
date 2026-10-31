export type UrlQueries = { [key: string]: string | number };
export type CallbackResponse<T> = (data: T) => void;
export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
