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
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300')
    sendJson(res, 200, await listPublicContent())
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to load website content.',
    })
  }
}
