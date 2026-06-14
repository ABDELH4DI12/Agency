import { listPublicContent } from '../server/supabase.js'

function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { message: 'Method not allowed.' })
    return
  }

  try {
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    res.setHeader('CDN-Cache-Control', 'no-store')
    sendJson(res, 200, await listPublicContent())
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to load website content.',
    })
  }
}
