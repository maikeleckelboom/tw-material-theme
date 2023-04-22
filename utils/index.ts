import {capitalize} from "@vue/runtime-core";

export const objectKeys = <T extends Record<string, unknown>>(obj: T): Array<keyof T> => (
    Object.keys(obj) as Array<keyof T>
)

export const objectEntries = <T extends Record<string, unknown>>(obj: T): Array<[keyof T, T[keyof T]]> => (
    Object.entries(obj) as Array<[keyof T, T[keyof T]]>
)

export const objectValues = <T extends Record<string, unknown>>(obj: T): Array<T[keyof T]> => (
    Object.values(obj) as Array<T[keyof T]>
)

export const objectFromEntries = <T extends Record<string, unknown>>(entries: Array<[keyof T, T[keyof T]]>): T => (
    Object.fromEntries(entries) as T
)
export const clamp = (min: number, max: number, value: number) => Math.min(Math.max(min, value), max)


export const camelize = (str: string) => str
    .split(/-|\s/)
    .map((word, index) => index === 0 ? word : capitalize(word))
    .join('')
    .replace(/^[A-Z]/, (str) => str.toLowerCase())
