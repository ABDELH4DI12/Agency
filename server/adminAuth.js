/* eslint-env node */

import crypto from 'node:crypto'

const COOKIE_NAME = 'creative_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 8

function withStatus(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function getSessionSecret(env = process.env) {
  const secret = env.ADMIN_SESSION_SECRET || env.SUPABASE_KEY

  if (!secret) {
    throw withStatus('Admin session secret is not configured.', 500)
  }

  return secret
}

function signPayload(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

function parseCookies(cookieHeader = '') {
  return String(cookieHeader)
    .split(';')
    .reduce((cookies, part) => {
      const separatorIndex = part.indexOf('=')

      if (separatorIndex === -1) {
        return cookies
      }

      const name = part.slice(0, separatorIndex).trim()
      const value = part.slice(separatorIndex + 1).trim()

      if (name) {
        cookies[name] = decodeURIComponent(value)
      }

      return cookies
    }, {})
}

export function createAdminSession({ env = process.env, now = Date.now() } = {}) {
  const payload = Buffer.from(JSON.stringify({
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000) + SESSION_DURATION_SECONDS,
    nonce: crypto.randomBytes(12).toString('base64url'),
  })).toString('base64url')
  const signature = signPayload(payload, getSessionSecret(env))

  return `${payload}.${signature}`
}

export function verifyAdminSession(token, { env = process.env, now = Date.now() } = {}) {
  if (!token || typeof token !== 'string') {
    return false
  }

  const [payload, signature, extra] = token.split('.')

  if (!payload || !signature || extra) {
    return false
  }

  const expectedSignature = signPayload(payload, getSessionSecret(env))
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return false
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const nowSeconds = Math.floor(now / 1000)

    return Number.isInteger(session.iat) &&
      Number.isInteger(session.exp) &&
      session.iat <= nowSeconds &&
      session.exp > nowSeconds
  } catch {
    return false
  }
}

export function isAdminRequest(req, options = {}) {
  const cookies = parseCookies(req.headers?.cookie)
  return verifyAdminSession(cookies[COOKIE_NAME], options)
}

export function requireAdmin(req, options = {}) {
  if (!isAdminRequest(req, options)) {
    throw withStatus('Admin authentication required.', 401)
  }
}

export function setAdminSessionCookie(res, token, { env = process.env } = {}) {
  const secure = env.VERCEL || env.NODE_ENV === 'production'
  const cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    'HttpOnly',
    'SameSite=Strict',
    secure ? 'Secure' : '',
  ].filter(Boolean).join('; ')

  res.setHeader('Set-Cookie', cookie)
}

export function clearAdminSessionCookie(res, { env = process.env } = {}) {
  const secure = env.VERCEL || env.NODE_ENV === 'production'
  const cookie = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Strict',
    secure ? 'Secure' : '',
  ].filter(Boolean).join('; ')

  res.setHeader('Set-Cookie', cookie)
}
