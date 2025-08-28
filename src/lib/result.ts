import { Result, ok, err } from 'neverthrow';

export { Result, ok, err };

export type AppResult<T, E = Error> = Result<T, E>;

export const createOk = <T>(value: T): AppResult<T> => ok(value);
export const createErr = <E = Error>(error: E): AppResult<never, E> => err(error);

export const isOk = <T, E>(result: AppResult<T, E>): result is Result<T, never> => {
  return result.isOk();
};

export const isErr = <T, E>(result: AppResult<T, E>): result is Result<never, E> => {
  return result.isErr();
};

export const unwrapOr = <T, E>(result: AppResult<T, E>, defaultValue: T): T => {
  return result.isOk() ? result.value : defaultValue;
};

export const mapErr = <T, E, F>(
  result: AppResult<T, E>,
  fn: (error: E) => F
): AppResult<T, F> => {
  return result.mapErr(fn);
};

export const chain = <T, U, E>(
  result: AppResult<T, E>,
  fn: (value: T) => AppResult<U, E>
): AppResult<U, E> => {
  return result.andThen(fn);
};

export interface ValidationError {
  field: string;
  message: string;
}

export interface BusinessError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ValidationResult<T> = AppResult<T, ValidationError[]>;
export type BusinessResult<T> = AppResult<T, BusinessError>;

export const combineResults = <T, E>(results: AppResult<T, E>[]): AppResult<T[], E> => {
  const values: T[] = [];
  for (const result of results) {
    if (result.isErr()) {
      return err(result.error);
    }
    values.push(result.value);
  }
  return ok(values);
};

export const tryAsync = async <T, E = Error>(
  fn: () => Promise<T>,
  mapError?: (error: unknown) => E
): Promise<AppResult<T, E>> => {
  try {
    const result = await fn();
    return ok(result);
  } catch (error) {
    const mappedError = mapError ? mapError(error) : (error as E);
    return err(mappedError);
    }
};

export const trySync = <T, E = Error>(
  fn: () => T,
  mapError?: (error: unknown) => E
): AppResult<T, E> => {
  try {
    const result = fn();
    return ok(result);
  } catch (error) {
    const mappedError = mapError ? mapError(error) : (error as E);
    return err(mappedError);
    }
};