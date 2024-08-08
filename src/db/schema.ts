import { TPhoto } from '@/schema/photo'
import { pgTable, text, timestamp, pgEnum, boolean, json } from 'drizzle-orm/pg-core'

export const providerEnum = pgEnum('provider', ['credentials', 'google', 'github'])

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  oauthId: text('oauth_id'),
  provider: providerEnum('provider'),
  name: text('name'),
  email: text('email').notNull(),
  password: text('password'),
  avatarUrl: text('avatar_url'),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', { mode: 'date', withTimezone: true }).notNull(),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const tokenPurposeEnum = pgEnum('token_purpose', ['emailVerification', 'createPassword', 'changePassword'])

export const tokenTable = pgTable('token', {
  id: text('id').primaryKey(),
  token: text('token'),
  payload: text('payload').notNull(),
  purpose: tokenPurposeEnum('purpose').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const albumTable = pgTable('album', {
  id: text('id').primaryKey(),
  addedBy: text('added_by')
    .notNull()
    .references(() => userTable.id),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const photoTable = pgTable('photo_table', {
  id: text('id').primaryKey(),
  albumId: text('album_id')
    .notNull()
    .references(() => albumTable.id, { onDelete: 'cascade' }),
  photo: json('photo').$type<TPhoto>(),
  addedAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
