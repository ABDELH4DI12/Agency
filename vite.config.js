/* eslint-env node */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createSignaturePayload } from './server/cloudinary.js'
import {
  createRow,
  createWebsite,
  deleteRow,
  deleteWebsite,
  getTableConfigs,
  listPublicContent,
  listRows,
  listWebsites,
  updateRow,
  updateWebsite,
} from './server/supabase.js'

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = ''

    req.on('data', (chunk) => {
      rawBody += chunk
    })

    req.on('end', () => {
      if (!rawBody) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(rawBody))
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function getQueryParam(req, name) {
  const url = new URL(req.url || '', 'http://localhost')
  return url.searchParams.get(name) || ''
}

async function handleWebsitesRequest(req, res, env) {
  try {
    if (req.method === 'GET') {
      sendJson(res, 200, { websites: await listWebsites({ env }) })
      return
    }

    if (req.method === 'POST') {
      sendJson(res, 200, {
        website: await createWebsite({
          env,
          input: await readRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'PATCH') {
      sendJson(res, 200, {
        website: await updateWebsite({
          env,
          id: getQueryParam(req, 'id'),
          input: await readRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'DELETE') {
      sendJson(res, 200, {
        website: await deleteWebsite({
          env,
          id: getQueryParam(req, 'id'),
        }),
      })
      return
    }

    sendJson(res, 405, { message: 'Method not allowed.' })
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to manage websites.',
    })
  }
}

async function handleAdminRequest(req, res, env) {
  try {
    if (req.method === 'GET' && getQueryParam(req, 'meta') === 'tables') {
      sendJson(res, 200, { tables: getTableConfigs() })
      return
    }

    const table = getQueryParam(req, 'table')

    if (req.method === 'GET') {
      sendJson(res, 200, { rows: await listRows({ env, table }) })
      return
    }

    if (req.method === 'POST') {
      sendJson(res, 200, {
        row: await createRow({
          env,
          table,
          input: await readRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'PATCH') {
      sendJson(res, 200, {
        row: await updateRow({
          env,
          table,
          id: getQueryParam(req, 'id'),
          input: await readRequestBody(req),
        }),
      })
      return
    }

    if (req.method === 'DELETE') {
      sendJson(res, 200, {
        row: await deleteRow({
          env,
          table,
          id: getQueryParam(req, 'id'),
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

async function handleContentRequest(req, res, env) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { message: 'Method not allowed.' })
    return
  }

  try {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300')
    sendJson(res, 200, await listPublicContent({ env }))
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      message: error.message || 'Unable to load website content.',
    })
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'cloudinary-signature-dev-api',
        configureServer(server) {
          server.middlewares.use('/api/cloudinary/signature', async (req, res) => {
            if (req.method !== 'POST') {
              sendJson(res, 405, { message: 'Method not allowed.' })
              return
            }

            try {
              const payload = createSignaturePayload({
                env: { ...process.env, ...env },
              })

              sendJson(res, 200, payload)
            } catch (error) {
              sendJson(res, error.statusCode || 500, {
                message: error.message || 'Unable to create Cloudinary signature.',
              })
            }
          })

          server.middlewares.use('/api/websites', async (req, res) => {
            await handleWebsitesRequest(req, res, { ...process.env, ...env })
          })

          server.middlewares.use('/api/admin', async (req, res) => {
            await handleAdminRequest(req, res, { ...process.env, ...env })
          })

          server.middlewares.use('/api/content', async (req, res) => {
            await handleContentRequest(req, res, { ...process.env, ...env })
          })
        },
      },
    ],
  }
})
