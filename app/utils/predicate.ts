export const isPromise = <T = unknown>(value: unknown): value is Promise<T> => {
  return value instanceof Promise;
};
