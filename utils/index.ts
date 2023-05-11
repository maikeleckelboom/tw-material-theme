import { capitalize } from "@vue/runtime-core";

const objectKeys = <T extends Record<string, unknown>>(
  obj: T
): Array<keyof T> => Object.keys(obj) as Array<keyof T>;

const objectEntries = <T extends Record<string, unknown>>(
  obj: T
): Array<[keyof T, T[keyof T]]> =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

const objectValues = <T extends Record<string, unknown>>(
  obj: T
): Array<T[keyof T]> => Object.values(obj) as Array<T[keyof T]>;

const objectFromEntries = <T extends Record<string, unknown>>(
  entries: Array<[keyof T, T[keyof T]]>
): T => Object.fromEntries(entries) as T;
const clamp = (min: number, max: number, value: number) =>
  Math.min(Math.max(min, value), max);

export {
  capitalize,
  objectKeys,
  objectEntries,
  objectValues,
  objectFromEntries,
  clamp,
};
