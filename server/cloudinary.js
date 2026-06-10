/* eslint-env node */

import crypto from 'node:crypto'

function parseCloudinaryUrl(cloudinaryUrl) {
  if (!cloudinaryUrl) {
    return {}
  }

  try {
    const parsedUrl = new URL(cloudinaryUrl)

    return {
      apiKey: decodeURIComponent(parsedUrl.username || ''),
      apiSecret: decodeURIComponent(parsedUrl.password || ''),
      cloudName: parsedUrl.hostname,
    }
  } catch {
    throw withStatus('CLOUDINARY_URL is not valid.', 500)
  }
}

function withStatus(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

export function getCloudinaryConfig(env = process.env) {
  const urlConfig = parseCloudinaryUrl(env.CLOUDINARY_URL)
  const apiKey = env.CLOUDINARY_API_KEY || urlConfig.apiKey
  const apiSecret = env.CLOUDINARY_API_SECRET || urlConfig.apiSecret
  const cloudName = env.CLOUDINARY_CLOUD_NAME || urlConfig.cloudName

  if (!apiKey || !apiSecret || !cloudName) {
    throw withStatus('Cloudinary credentials are not configured.', 500)
  }

  return {
    apiKey,
    apiSecret,
    cloudName,
  }
}

export function createUploadSignature(params, apiSecret) {
  const signatureBase = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  return crypto.createHash('sha1').update(`${signatureBase}${apiSecret}`).digest('hex')
}

export function createSignaturePayload({ env = process.env } = {}) {
  const { apiKey, apiSecret, cloudName } = getCloudinaryConfig(env)
  const uploadParams = {
    timestamp: Math.round(Date.now() / 1000),
  }

  return {
    apiKey,
    cloudName,
    ...uploadParams,
    signature: createUploadSignature(uploadParams, apiSecret),
  }
}
