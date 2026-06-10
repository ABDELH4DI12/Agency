/* eslint-env node */

export const TABLE_CONFIGS = {
  websites: {
    name: 'websites',
    label: 'Websites',
    order: 'id.desc',
    fields: [
      { name: 'headTags', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'footTags', type: 'text' },
      { name: 'websiteUrl', type: 'text' },
      { name: 'imageUrl', type: 'text' },
    ],
  },
  collection: {
    name: 'collection',
    label: 'Collection',
    order: 'sequence.asc.nullslast,id.desc',
    fields: [
      { name: 'sequence', type: 'number' },
      { name: 'title', type: 'text' },
      { name: 'tags', type: 'text' },
    ],
  },
  collectionImages: {
    name: 'collectionImages',
    label: 'Collection Images',
    order: 'id.desc',
    fields: [
      { name: 'collectionId', type: 'number' },
      { name: 'imageUrl', type: 'text' },
    ],
  },
  videos: {
    name: 'videos',
    label: 'Videos',
    order: 'id.desc',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'tags', type: 'text' },
      { name: 'videoUrl', type: 'video' },
      { name: 'videoType', type: 'text' },
    ],
  },
  marchendise: {
    name: 'marchendise',
    label: 'Marchendise',
    order: 'id.desc',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'imageUrl', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'tags', type: 'text' },
    ],
  },
}

function withStatus(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function getTableConfig(tableName) {
  const config = TABLE_CONFIGS[tableName]

  if (!config) {
    throw withStatus('Unknown table.', 400)
  }

  return config
}

function getSupabaseConfig(env = process.env) {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseKey = env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw withStatus('Supabase credentials are not configured.', 500)
  }

  const restUrl = supabaseUrl.includes('/rest/v1')
    ? supabaseUrl.replace(/\/+$/, '')
    : `${supabaseUrl.replace(/\/+$/, '')}/rest/v1`

  return {
    restUrl,
    supabaseKey,
  }
}

function getHeaders(supabaseKey, extraHeaders = {}) {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    ...extraHeaders,
  }
}

function cleanTableInput(config, input = {}) {
  return config.fields.reduce((payload, field) => {
    const value = input[field.name]

    if (field.type === 'number') {
      payload[field.name] = value === undefined || value === null || value === '' ? null : Number(value)
      return payload
    }

    payload[field.name] = value === undefined || value === null ? '' : String(value)
    return payload
  }, {})
}

async function readSupabaseResponse(response, fallbackMessage) {
  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw withStatus(payload?.message || payload?.hint || fallbackMessage, response.status || 500)
  }

  return payload
}

export function getTableConfigs() {
  return Object.values(TABLE_CONFIGS).map((config) => ({
    name: config.name,
    label: config.label,
    fields: config.fields,
  }))
}

export async function listRows({ env = process.env, table } = {}) {
  const config = getTableConfig(table)
  const { restUrl, supabaseKey } = getSupabaseConfig(env)
  const query = new URLSearchParams({
    select: '*',
    order: config.order,
  })
  const response = await globalThis.fetch(`${restUrl}/${config.name}?${query.toString()}`, {
    headers: getHeaders(supabaseKey),
  })

  return readSupabaseResponse(response, `Unable to load ${config.label}.`)
}

export async function createRow({ env = process.env, table, input = {} } = {}) {
  const config = getTableConfig(table)
  const { restUrl, supabaseKey } = getSupabaseConfig(env)
  const response = await globalThis.fetch(`${restUrl}/${config.name}`, {
    method: 'POST',
    headers: getHeaders(supabaseKey, { Prefer: 'return=representation' }),
    body: JSON.stringify(cleanTableInput(config, input)),
  })
  const payload = await readSupabaseResponse(response, `Unable to create ${config.label}.`)

  return Array.isArray(payload) ? payload[0] : payload
}

export async function updateRow({ env = process.env, table, id, input = {} } = {}) {
  const config = getTableConfig(table)
  const cleanId = Number(id)

  if (!Number.isInteger(cleanId)) {
    throw withStatus('Row id is required.', 400)
  }

  const { restUrl, supabaseKey } = getSupabaseConfig(env)
  const response = await globalThis.fetch(`${restUrl}/${config.name}?id=eq.${cleanId}`, {
    method: 'PATCH',
    headers: getHeaders(supabaseKey, { Prefer: 'return=representation' }),
    body: JSON.stringify(cleanTableInput(config, input)),
  })
  const payload = await readSupabaseResponse(response, `Unable to update ${config.label}.`)

  return Array.isArray(payload) ? payload[0] : payload
}

export async function deleteRow({ env = process.env, table, id } = {}) {
  const config = getTableConfig(table)
  const cleanId = Number(id)

  if (!Number.isInteger(cleanId)) {
    throw withStatus('Row id is required.', 400)
  }

  const { restUrl, supabaseKey } = getSupabaseConfig(env)
  const response = await globalThis.fetch(`${restUrl}/${config.name}?id=eq.${cleanId}`, {
    method: 'DELETE',
    headers: getHeaders(supabaseKey, { Prefer: 'return=representation' }),
  })
  const payload = await readSupabaseResponse(response, `Unable to delete ${config.label}.`)

  return Array.isArray(payload) ? payload[0] : payload
}

export async function listPublicContent(options = {}) {
  const [websites, collections, collectionImages, marchendise] = await Promise.all([
    listRows({ ...options, table: 'websites' }),
    listRows({ ...options, table: 'collection' }),
    listRows({ ...options, table: 'collectionImages' }),
    listRows({ ...options, table: 'marchendise' }),
  ])
  const imagesByCollectionId = collectionImages.reduce((imagesById, image) => {
    const collectionId = image.collectionId

    if (!imagesById[collectionId]) {
      imagesById[collectionId] = []
    }

    imagesById[collectionId].push(image)
    return imagesById
  }, {})

  return {
    websites,
    collections: collections.map((collection) => ({
      ...collection,
      images: imagesByCollectionId[collection.id] || [],
    })),
    collectionImages,
    marchendise,
  }
}

export async function listWebsites(options = {}) {
  return listRows({ ...options, table: 'websites' })
}

export async function createWebsite(options = {}) {
  return createRow({ ...options, table: 'websites' })
}

export async function updateWebsite(options = {}) {
  return updateRow({ ...options, table: 'websites' })
}

export async function deleteWebsite(options = {}) {
  return deleteRow({ ...options, table: 'websites' })
}
