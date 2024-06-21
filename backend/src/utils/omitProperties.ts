export type OmitByKeys<T, K extends keyof T> = {
  [P in keyof T as Exclude<P, K>]: T[P];
};

export function omitProperties<T, K extends keyof T>(
  obj: T,
  keys: K[]
): OmitByKeys<T, K> {
  const result = {} as OmitByKeys<T, K>;

  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (!keys.includes(key as K)) {
      // @ts-expect-error This is correct dont bother
      result[key] = obj[key];
    }
  });

  return result;
}
