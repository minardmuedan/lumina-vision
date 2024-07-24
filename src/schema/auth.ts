import { z } from 'zod'

const errorCause = z.enum(['invalid', 'incorrect', 'expired', 'limit', 'not_found', 'server_error', 'already_exist'])

const signUpAuthTokenSession = z.object({
  tokenId: z.string(),
  purpose: z.enum(['eV', 'crP', 'chP']),
})
const loginAuthTokenSession = z.object({
  email: z.string(),
})
const luciaAuthTokenSession = z.object({
  id: z.string(),
})
export type TAuthTokenSessionSignUp = z.infer<typeof signUpAuthTokenSession>
export type TAuthTokenSessionLogin = z.infer<typeof loginAuthTokenSession>
export type TLuciaAuthTokenSession = z.infer<typeof luciaAuthTokenSession>

const actionSuccess = z.object({
  type: z.literal('success'),
  message: z.string().optional(),
})
const actionError = z.object({
  type: z.literal('error'),
  cause: errorCause,
  message: z.string(),
})
const actionReturn = actionSuccess.or(actionError)
export type TActionReturn = z.infer<typeof actionReturn>

export const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})
export type TEmail = z.infer<typeof emailSchema>

export const loginPasswordSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})
export type TLoginPassword = z.infer<typeof loginPasswordSchema>

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})
export type TLogin = z.infer<typeof loginSchema>

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'At least 8 characters long')
    .max(255, '255 characters max')
    .regex(/[A-Z]/, 'Must contain one uppercase letter')
    .regex(/[a-z]/, 'Must contain one lowercase letter')
    .regex(/[0-9]/, 'Must contain one digit')
    .regex(/^[^\s]+$/, 'Must not contain spaces'),
})
export type TPassword = z.infer<typeof passwordSchema>
