import { createRow, deleteRow, getTableConfigs, listRows, updateRow } from '../server/supabase.js'

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
    if (req.method === 'GET' && req.query?.meta === 'tables') {
      sendJson(res, 200, { tables: getTableConfigs() })
      return
    }

    const table = getQueryValue(req.query?.table)

    if (req.method === 'GET') {
      sendJson(res, 200, { rows: await listRows({ table }) })
      return
    }

    if (req.method === 'POST') {
      sendJson(res, 200, { row: await createRow({ table, input: getRequestBody(req) }) })
      return
    }

    if (req.method === 'PATCH') {
      sendJson(res, 200, {
        row: await updateRow({
          table,
          id: getQueryValue(req.query?.id),
          input: getRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'DELETE') {
      sendJson(res, 200, {
        row: await deleteRow({
          table,
          id: getQueryValue(req.query?.id),
        }),
      })
      return
    }

    sendJson(res, 405, { message: 'Method not allowed.' })
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to manage database.',
    })
  }
}
