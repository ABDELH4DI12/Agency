import { createSignaturePayload } from '../../server/cloudinary.js'
import { requireAdmin } from '../../server/adminAuth.js'

function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload)
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { message: 'Method not allowed.' })
    return
  }

  try {
    requireAdmin(req)
    const payload = createSignaturePayload()

    sendJson(res, 200, payload)
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to create Cloudinary signature.',
    })
  }
}
