import { createWebsite, deleteWebsite, listWebsites, updateWebsite } from '../server/supabase.js'

function sendJson(res, statusCode, payload) {
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

function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value || ''
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      sendJson(res, 200, { websites: await listWebsites() })
      return
    }

    if (req.method === 'POST') {
      sendJson(res, 200, { website: await createWebsite({ input: getRequestBody(req) }) })
      return
    }

    if (req.method === 'PATCH') {
      sendJson(res, 200, {
        website: await updateWebsite({
          id: getQueryValue(req.query?.id),
          input: getRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'DELETE') {
      sendJson(res, 200, { website: await deleteWebsite({ id: getQueryValue(req.query?.id) }) })
      return
    }

    sendJson(res, 405, { message: 'Method not allowed.' })
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to manage websites.',
    })
  }
}
