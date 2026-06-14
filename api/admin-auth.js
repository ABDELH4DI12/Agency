import {
  clearAdminSessionCookie,
  createAdminSession,
  isAdminRequest,
  setAdminSessionCookie,
} from '../server/adminAuth.js'
import { verifyAdminPassword } from '../server/supabase.js'

function sendJson(res, statusCode, payload) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.status(statusCode).json(payload)
}

function getRequestBody(req) {
  if (typeof req.body !== 'string') {
    return req.body || {}
  }

  try {
    return JSON.parse(req.body)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      sendJson(res, isAdminRequest(req) ? 200 : 401, {
        authenticated: isAdminRequest(req),
      })
      return
    }

    if (req.method === 'POST') {
      const { password } = getRequestBody(req)
      const isValid = await verifyAdminPassword({ password })

      if (!isValid) {
        await new Promise((resolve) => setTimeout(resolve, 350))
        sendJson(res, 401, { message: 'Invalid password.' })
        return
      }

      setAdminSessionCookie(res, createAdminSession())
      sendJson(res, 200, { authenticated: true })
      return
    }

    if (req.method === 'DELETE') {
      clearAdminSessionCookie(res)
      sendJson(res, 200, { authenticated: false })
      return
    }

    sendJson(res, 405, { message: 'Method not allowed.' })
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to authenticate admin.',
    })
  }
}
