import { createUserDb, getUserByOauthIdDb } from '@/db/data-access/user'
import { TGithubUser, TGithubUserEmails, TGoogleUser, github, google } from '@/lib/lucia-auth/providers'
import { generateId, getCookie } from '@/lib/helpers'
import { createLuciaSession } from '@/lib/lucia-auth/session'
import { NextResponse } from 'next/server'

// GOOGLE & GITHUB CALLBACK VALIDATIONS

export async function GET(req: Request, { params: { provider } }: { params: { provider: string } }) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = (provider === 'google' ? getCookie('google_oauth_state') : getCookie('github_oauth_state')) ?? null
  if (!code || !state || !storedState || state !== storedState) return redirect('/error', url)

  try {
    const newId = generateId()

    // google
    if (provider === 'google') {
      const codeVerifier = getCookie('code_verifier') ?? null
      if (!codeVerifier) return redirect('/auth/signin', url)

      const tokens = await google.validateAuthorizationCode(code, codeVerifier)
      const googleUser: TGoogleUser = await getOauthUser('https://openidconnect.googleapis.com/v1/userinfo', tokens)
      const { sub: oauthId, email, email_verified, name, picture } = googleUser

      const existingUser = await getUserByOauthIdDb(oauthId)
      if (existingUser) return setSessionAndCookiesThenRedirect(existingUser.id, url)

      await createUserDb(newId, oauthId, 'google', name, email, email_verified, null, picture)
    }

    // github
    if (provider === 'github') {
      const tokens = await github.validateAuthorizationCode(code)
      const { id: oauthId, login: username, avatar_url }: TGithubUser = await getOauthUser('https://api.github.com/user', tokens)

      const existingUser = await getUserByOauthIdDb(oauthId)
      if (existingUser) return setSessionAndCookiesThenRedirect(existingUser.id, url)

      const githubUserEmail: TGithubUserEmails = await getOauthUser('https://api.github.com/user/emails', tokens)
      const primaryEmail = githubUserEmail.find((email) => email.primary) ?? githubUserEmail[0] ?? null

      console.log({ oauthId, username, avatar_url })
      console.log({ githubUserEmail })
      console.log({ primaryEmail })

      await createUserDb(newId, oauthId, 'github', username, primaryEmail.email, primaryEmail.verified, null, avatar_url)
    }

    return setSessionAndCookiesThenRedirect(newId, url)
  } catch (err) {
    console.log({ err })
    return redirect('/error', url)
  }
}

//
// helpers
async function setSessionAndCookiesThenRedirect(userId: string, url: URL) {
  await createLuciaSession(userId)
  return redirect('/', url)
}

async function getOauthUser(url: string, tokens: { accessToken: string }) {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${tokens.accessToken}` } })
  return await response.json()
}

function redirect(url: string, base: URL) {
  return NextResponse.redirect(new URL(url, base))
}
