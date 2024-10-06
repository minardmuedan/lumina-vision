import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type TPrettify<T> = { [K in keyof T]: T[K] } & {}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
