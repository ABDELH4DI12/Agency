import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  STATIC_COLLECTIONS,
  STATIC_MARCHENDISE,
  STATIC_PROJECTS,
  STATIC_VIDEOS,
} from '../../server/staticSeedData.js'

const TABLES = [
  {
    name: 'websites',
    label: 'Websites',
    description: 'Portfolio websites and project SEO fields.',
    fields: [
      { name: 'headTags', label: 'Head Tags', type: 'textarea' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'footTags', label: 'Foot Tags', type: 'textarea' },
      { name: 'websiteUrl', label: 'Website URL', type: 'url' },
      { name: 'imageUrl', label: 'Image', type: 'image' },
    ],
  },
  {
    name: 'collection',
    label: 'Collection',
    description: 'Ordered creative collections with comma tags.',
    fields: [
      { name: 'sequence', label: 'Sequence', type: 'number' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
  {
    name: 'collectionImages',
    label: 'Collection Images',
    description: 'Images attached to collection rows.',
    fields: [
      { name: 'collectionId', label: 'Collection', type: 'relation', table: 'collection' },
      { name: 'imageUrl', label: 'Image', type: 'image' },
    ],
  },
  {
    name: 'videos',
    label: 'Videos',
    description: 'Video entries, links, types, and comma tags.',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'videoUrl', label: 'Video', type: 'video' },
      { name: 'videoType', label: 'Video Type', type: 'text' },
    ],
  },
  {
    name: 'marchendise',
    label: 'Marchendise',
    description: 'Merchandise images, descriptions, and comma tags.',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'imageUrl', label: 'Image', type: 'image' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'tags', label: 'Tags', type: 'tags' },
    ],
  },
]
const EMPTY_ROWS = []

function formatBytes(bytes) {
  if (!bytes) {
    return '0 KB'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function createEmptyForm(table) {
  return table.fields.reduce((form, field) => {
    form[field.name] = ''
    return form
  }, {})
}

function parseTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function getPrimaryText(row, table) {
  return row.title || row.description || row.websiteUrl || row.videoUrl || row.imageUrl || `${table.label} #${row.id}`
}

function getUrl(row) {
  return row.websiteUrl || row.videoUrl || row.imageUrl || ''
}

function isCloudinaryUrl(url) {
  try {
    const hostname = new URL(url).hostname
    return hostname === 'cloudinary.com' || hostname.endsWith('.cloudinary.com')
  } catch {
    return false
  }
}

async function uploadToCloudinary(resourceType, fileOrUrl) {
  const signatureResponse = await fetch('/api/cloudinary/signature', {
    method: 'POST',
  })
  const signaturePayload = await signatureResponse.json().catch(() => ({}))

  if (!signatureResponse.ok) {
    throw new Error(signaturePayload.message || `Unable to prepare ${resourceType} upload.`)
  }

  const formData = new FormData()
  formData.append('file', fileOrUrl)
  formData.append('api_key', signaturePayload.apiKey)
  formData.append('timestamp', signaturePayload.timestamp)
  formData.append('signature', signaturePayload.signature)

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${signaturePayload.cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
  const uploadPayload = await uploadResponse.json().catch(() => ({}))

  if (!uploadResponse.ok) {
    throw new Error(uploadPayload.error?.message || 'Cloudinary upload failed.')
  }

  return uploadPayload.secure_url
}

async function uploadImageToCloudinary(fileOrUrl) {
  return uploadToCloudinary('image', fileOrUrl)
}

async function uploadVideoToCloudinary(fileOrUrl) {
  return uploadToCloudinary('video', fileOrUrl)
}

async function uploadStaticImageToCloudinary(source) {
  if (source.startsWith('/')) {
    const response = await fetch(source)

    if (!response.ok) {
      throw new Error(`Unable to load local image: ${source}`)
    }

    const blob = await response.blob()
    const filename = source.split('/').pop() || 'image'
    return uploadImageToCloudinary(new File([blob], filename, { type: blob.type || 'image/jpeg' }))
  }

  return uploadImageToCloudinary(source)
}

async function createAdminRow(table, input) {
  const response = await fetch(`/api/admin?table=${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || `Unable to create ${table} row.`)
  }

  return payload.row
}

function AdminPanel() {
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const [activeTableName, setActiveTableName] = useState(TABLES[0].name)
  const activeTable = useMemo(
    () => TABLES.find((table) => table.name === activeTableName) || TABLES[0],
    [activeTableName]
  )
  const [rowsByTable, setRowsByTable] = useState({})
  const [form, setForm] = useState(() => createEmptyForm(TABLES[0]))
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [message, setMessage] = useState('')

  const rows = rowsByTable[activeTable.name] || []
  const activeRowsLoaded = Boolean(rowsByTable[activeTable.name])
  const collectionRows = rowsByTable.collection || EMPTY_ROWS
  const collectionTitleById = useMemo(
    () =>
      collectionRows.reduce((titles, row) => {
        titles[row.id] = row.title || `Collection #${row.id}`
        return titles
      }, {}),
    [collectionRows]
  )
  const hasImageField = activeTable.fields.some((field) => field.type === 'image')
  const hasVideoField = activeTable.fields.some((field) => field.type === 'video')
  const rowsWithTags = rows.filter((row) => parseTags(row.tags).length).length
  const rowsWithMedia = rows.filter((row) => row.imageUrl || row.videoUrl || row.websiteUrl).length

  const updateForm = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const clearImageSelection = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImageFile(null)
    setImagePreview('')
  }, [imagePreview])

  const clearVideoSelection = useCallback(() => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }

    setVideoFile(null)
    setVideoPreview('')
  }, [videoPreview])

  const resetForm = useCallback((table = activeTable) => {
    setEditingId(null)
    setForm(createEmptyForm(table))
    clearImageSelection()
    clearVideoSelection()
    setMessage('')
  }, [activeTable, clearImageSelection, clearVideoSelection])

  const loadRows = useCallback(async (tableName, options = {}) => {
    const table = TABLES.find((item) => item.name === tableName) || TABLES[0]
    const isSilent = options.silent

    if (!isSilent) {
      setIsLoading(true)
      setMessage(`Loading ${table.label}...`)
    }

    try {
      const response = await fetch(`/api/admin?table=${table.name}`)
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || `Unable to load ${table.label}.`)
      }

      setRowsByTable((currentRows) => ({
        ...currentRows,
        [table.name]: payload.rows || [],
      }))
      if (!isSilent) {
        setMessage(payload.rows?.length ? '' : `${table.label} has no rows yet.`)
      }
    } catch (error) {
      if (!isSilent) {
        setMessage(error.message)
      }
    } finally {
      if (!isSilent) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    loadRows(TABLES[0].name)
  }, [loadRows])

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview)
      }
    }
  }, [videoPreview])

  const chooseTable = (tableName) => {
    const table = TABLES.find((item) => item.name === tableName) || TABLES[0]

    setActiveTableName(tableName)
    resetForm(table)

    if (!rowsByTable[tableName]) {
      loadRows(tableName)
    }

    if (tableName === 'collectionImages' && !rowsByTable.collection) {
      loadRows('collection', { silent: true })
    }
  }

  const chooseImage = (fileList) => {
    const selectedFile = Array.from(fileList || []).find((file) => file.type.startsWith('image/'))

    if (!selectedFile) {
      setMessage('Choose an image file.')
      return
    }

    clearImageSelection()
    setImageFile(selectedFile)
    setImagePreview(URL.createObjectURL(selectedFile))
    setMessage('Image selected. It will upload to Cloudinary when you save.')
  }

  const chooseVideo = (fileList) => {
    const selectedFile = Array.from(fileList || []).find((file) => file.type.startsWith('video/'))

    if (!selectedFile) {
      setMessage('Choose a video file.')
      return
    }

    clearVideoSelection()
    setVideoFile(selectedFile)
    setVideoPreview(URL.createObjectURL(selectedFile))
    setMessage('Video selected. It will upload to Cloudinary when you save.')
  }

  const saveRow = async (event) => {
    event.preventDefault()
    setIsSaving(true)

    const videoUrl = String(form.videoUrl || '').trim()
    const shouldUploadVideoUrl = hasVideoField && videoUrl && !isCloudinaryUrl(videoUrl)

    setMessage(
      imageFile
        ? 'Uploading image to Cloudinary...'
        : videoFile || shouldUploadVideoUrl
          ? 'Uploading video to Cloudinary...'
          : editingId ? 'Updating row...' : 'Creating row...'
    )

    try {
      let payloadForm = form

      if (imageFile && hasImageField) {
        const imageUrl = await uploadImageToCloudinary(imageFile)
        payloadForm = {
          ...payloadForm,
          imageUrl,
        }
        setForm(payloadForm)
        setMessage(editingId ? 'Updating row...' : 'Creating row...')
      }

      if (hasVideoField && (videoFile || shouldUploadVideoUrl)) {
        const uploadedVideoUrl = await uploadVideoToCloudinary(videoFile || videoUrl)
        payloadForm = {
          ...payloadForm,
          videoUrl: uploadedVideoUrl,
        }
        setForm(payloadForm)
        setMessage(editingId ? 'Updating row...' : 'Creating row...')
      } else if (hasVideoField && videoUrl) {
        payloadForm = {
          ...payloadForm,
          videoUrl,
        }
      }

      const url = editingId ? `/api/admin?table=${activeTable.name}&id=${editingId}` : `/api/admin?table=${activeTable.name}`
      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadForm),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to save row.')
      }

      const savedRow = payload.row

      setRowsByTable((currentRows) => {
        const currentTableRows = currentRows[activeTable.name] || []

        return {
          ...currentRows,
          [activeTable.name]: editingId
            ? currentTableRows.map((row) => (row.id === savedRow.id ? savedRow : row))
            : [savedRow, ...currentTableRows],
        }
      })
      setEditingId(null)
      setForm(createEmptyForm(activeTable))
      clearImageSelection()
      clearVideoSelection()
      setMessage(editingId ? 'Row updated.' : 'Row created.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const editRow = (row) => {
    clearImageSelection()
    clearVideoSelection()
    setEditingId(row.id)
    setForm(
      activeTable.fields.reduce((nextForm, field) => {
        nextForm[field.name] = row[field.name] ?? ''
        return nextForm
      }, {})
    )
    setMessage(`Editing ${activeTable.label} #${row.id}.`)
  }

  const deleteRow = async (row) => {
    if (!window.confirm(`Delete ${getPrimaryText(row, activeTable)}?`)) {
      return
    }

    setDeletingId(row.id)
    setMessage('Deleting row...')

    try {
      const response = await fetch(`/api/admin?table=${activeTable.name}&id=${row.id}`, {
        method: 'DELETE',
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to delete row.')
      }

      setRowsByTable((currentRows) => ({
        ...currentRows,
        [activeTable.name]: (currentRows[activeTable.name] || []).filter((item) => item.id !== row.id),
      }))
      setMessage('Row deleted.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setDeletingId(null)
    }
  }

  const copyText = async (text) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      setMessage('Copied.')
      return
    }

    setMessage(text)
  }

  const seedStaticData = async () => {
    if (!window.confirm('Create database rows from the current static website data? This will add new rows and upload the static images to Cloudinary.')) {
      return
    }

    setIsSeeding(true)
    setMessage('Seeding static website data. Uploading images to Cloudinary...')

    try {
      const counts = {
        websites: 0,
        collection: 0,
        collectionImages: 0,
        videos: 0,
        marchendise: 0,
        imageFallbacks: 0,
      }

      const uploadSeedImage = async (source) => {
        try {
          return await uploadStaticImageToCloudinary(source)
        } catch {
          counts.imageFallbacks += 1
          return source
        }
      }

      for (const project of STATIC_PROJECTS) {
        setMessage(`Seeding website: ${project.title}`)
        const imageUrl = await uploadSeedImage(project.image)

        await createAdminRow('websites', {
          title: project.title,
          description: project.description,
          websiteUrl: project.link,
          imageUrl,
          headTags: project.tags,
          footTags: '',
        })
        counts.websites += 1
      }

      for (const collection of STATIC_COLLECTIONS) {
        setMessage(`Creating collection: ${collection.title}`)
        const collectionRow = await createAdminRow('collection', {
          sequence: collection.sequence,
          title: collection.title,
          tags: collection.tags,
        })
        counts.collection += 1

        for (let index = 0; index < collection.images.length; index += 1) {
          setMessage(`Uploading ${collection.title} image ${index + 1} of ${collection.images.length}`)
          const imageUrl = await uploadSeedImage(collection.images[index])

          await createAdminRow('collectionImages', {
            collectionId: collectionRow.id,
            imageUrl,
          })
          counts.collectionImages += 1
        }
      }

      for (const video of STATIC_VIDEOS) {
        setMessage(`Creating video row: ${video.title}`)
        await createAdminRow('videos', video)
        counts.videos += 1
      }

      for (const item of STATIC_MARCHENDISE) {
        setMessage(`Seeding marchendise: ${item.title}`)
        const imageUrl = await uploadSeedImage(item.image)

        await createAdminRow('marchendise', {
          title: item.title,
          description: item.description,
          tags: item.tags,
          imageUrl,
        })
        counts.marchendise += 1
      }

      setRowsByTable({})
      await loadRows(activeTable.name)
      if (activeTable.name === 'collectionImages') {
        await loadRows('collection', { silent: true })
      }
      setMessage(
        `Seed complete: ${counts.websites} websites, ${counts.collection} collections, ${counts.collectionImages} collection images, ${counts.videos} videos, ${counts.marchendise} marchendise rows${counts.imageFallbacks ? `, ${counts.imageFallbacks} image URLs kept as originals` : ''}.`
      )
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSeeding(false)
    }
  }

  const renderField = (field) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          value={form[field.name] || ''}
          onChange={(event) => updateForm(field.name, event.target.value)}
          rows={field.name === 'description' ? 4 : 3}
          className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
        />
      )
    }

    if (field.type === 'image') {
      return (
        <div className="mt-2 rounded-lg border border-white/10 bg-zinc-950 p-3">
          {(imagePreview || form[field.name]) && (
            <img
              src={imagePreview || form[field.name]}
              alt={form.title || field.label}
              className="mb-3 aspect-video w-full rounded-md object-cover"
            />
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(event) => {
              chooseImage(event.target.files)
              event.target.value = ''
            }}
            className="hidden"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-white/10 px-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSaving}
            >
              Choose Image
            </button>
            {imageFile && (
              <button
                type="button"
                onClick={clearImageSelection}
                className="inline-flex h-10 items-center justify-center rounded-md border border-red-400/30 px-3 text-sm font-semibold text-red-200 transition hover:border-red-400/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSaving}
              >
                Clear
              </button>
            )}
          </div>
          {imageFile && (
            <p className="mt-2 text-xs text-zinc-400">
              {imageFile.name} - {formatBytes(imageFile.size)}
            </p>
          )}
          <input
            type="url"
            value={form[field.name] || ''}
            onChange={(event) => updateForm(field.name, event.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="mt-3 h-10 w-full rounded-md border border-white/10 bg-zinc-900 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
          />
        </div>
      )
    }

    if (field.type === 'video') {
      const source = videoPreview || String(form[field.name] || '').trim()

      return (
        <div className="mt-2 rounded-lg border border-white/10 bg-zinc-950 p-3">
          {source && (
            <video
              src={source}
              controls
              preload="metadata"
              className="mb-3 aspect-video w-full rounded-md bg-black object-cover"
            />
          )}
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={(event) => {
              chooseVideo(event.target.files)
              event.target.value = ''
            }}
            className="hidden"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-white/10 px-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSaving}
            >
              Choose Video
            </button>
            {videoFile && (
              <button
                type="button"
                onClick={clearVideoSelection}
                className="inline-flex h-10 items-center justify-center rounded-md border border-red-400/30 px-3 text-sm font-semibold text-red-200 transition hover:border-red-400/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSaving}
              >
                Clear
              </button>
            )}
          </div>
          {videoFile && (
            <p className="mt-2 text-xs text-zinc-400">
              {videoFile.name} - {formatBytes(videoFile.size)}
            </p>
          )}
          <input
            type="url"
            value={form[field.name] || ''}
            onChange={(event) => updateForm(field.name, event.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="mt-3 h-10 w-full rounded-md border border-white/10 bg-zinc-900 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
          />
        </div>
      )
    }

    if (field.type === 'relation') {
      const options = field.table === 'collection' ? collectionRows : []

      return (
        <select
          value={form[field.name] || ''}
          onChange={(event) => updateForm(field.name, event.target.value)}
          disabled={!options.length}
          className="mt-2 h-11 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
        >
          <option value="">{options.length ? 'Select collection' : 'Load collection rows first'}</option>
          {options.map((row) => (
            <option key={row.id} value={row.id}>
              #{row.id} - {row.title || 'Untitled collection'}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
        value={form[field.name] || ''}
        onChange={(event) => updateForm(field.name, event.target.value)}
        placeholder={field.type === 'tags' ? 'site,ecomm,ui' : ''}
        className="mt-2 h-11 w-full rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
      />
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-outfit">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-zinc-950 px-4 py-5 lg:border-b-0 lg:border-r">
          <a href="/" className="text-sm font-medium text-zinc-400 transition hover:text-white">
            Back to site
          </a>
          <h1 className="mt-4 text-2xl font-black text-white">Admin Dashboard</h1>
          <nav className="mt-8 space-y-2">
            {TABLES.map((table) => {
              const cachedRows = rowsByTable[table.name]
              const isActive = activeTable.name === table.name

              return (
                <button
                  key={table.name}
                  type="button"
                  onClick={() => chooseTable(table.name)}
                  className={`flex h-12 w-full items-center justify-between rounded-md px-3 text-left text-sm font-bold transition ${
                    isActive
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{table.label}</span>
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      isActive ? 'bg-zinc-950/10 text-zinc-950' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {cachedRows ? cachedRows.length : '-'}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-white/10 px-4 py-5 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-emerald-300">{activeTable.name}</p>
                <h2 className="mt-1 text-3xl font-black text-white">{activeTable.label}</h2>
                <p className="mt-2 text-sm text-zinc-400">{activeTable.description}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={seedStaticData}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-500 px-4 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading || isSaving || isSeeding}
                >
                  {isSeeding ? 'Seeding Data' : 'Seed Static Data'}
                </button>
                <button
                  type="button"
                  onClick={() => loadRows(activeTable.name)}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-bold text-zinc-200 transition hover:border-white/25 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading || isSaving || isSeeding}
                >
                  {isLoading ? 'Refreshing' : 'Refresh'}
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-8">
            {(isLoading || isSeeding) && (
              <div className="mb-5 overflow-hidden rounded-full bg-white/10">
                <div className="h-1.5 w-1/2 animate-pulse rounded-full bg-emerald-400" />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-zinc-400">Rows</p>
                <p className="mt-3 text-3xl font-black text-white">{rows.length}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-zinc-400">With Media</p>
                <p className="mt-3 text-3xl font-black text-white">{rowsWithMedia}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-zinc-400">Tagged</p>
                <p className="mt-3 text-3xl font-black text-white">{rowsWithTags}</p>
              </div>
            </div>

            {message && (
              <div className="mt-5 rounded-md border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
                {message}
              </div>
            )}

            <div className="mt-5 grid gap-5 xl:grid-cols-[420px_1fr]">
              <form className="rounded-lg border border-white/10 bg-white/[0.04] p-5" onSubmit={saveRow}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Row' : 'Create Row'}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {editingId ? `${activeTable.label} #${editingId}` : `New ${activeTable.label} record`}
                    </p>
                  </div>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 px-3 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/5"
                    >
                      New
                    </button>
                  )}
                </div>

                <div className="mt-5 space-y-4">
                  {activeTable.fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="text-sm font-semibold text-zinc-300">{field.label}</span>
                      {renderField(field)}
                      {field.type === 'tags' && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {parseTags(form[field.name]).map((tag) => (
                            <span key={tag} className="rounded bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving' : editingId ? 'Update Row' : 'Create Row'}
                </button>
              </form>

              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                <div className="grid grid-cols-[96px_1fr_116px] gap-4 border-b border-white/10 bg-zinc-900 px-4 py-3 text-xs font-bold uppercase text-zinc-400 md:grid-cols-[120px_1fr_1fr_132px]">
                  <span>Media</span>
                  <span>Record</span>
                  <span className="hidden md:block">Tags / Link</span>
                  <span className="text-right">Actions</span>
                </div>

                <div className="max-h-[720px] divide-y divide-white/10 overflow-y-auto">
                  {isLoading && !activeRowsLoaded ? (
                    <div className="bg-zinc-950 px-4 py-16 text-center">
                      <div className="mx-auto h-10 w-10 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />
                      <p className="mt-4 text-sm font-semibold text-zinc-300">Loading rows...</p>
                    </div>
                  ) : rows.map((row) => {
                    const url = getUrl(row)
                    const tags = parseTags(row.tags)

                    return (
                      <article
                        key={row.id}
                        className="grid grid-cols-[96px_1fr_116px] gap-4 bg-zinc-950 px-4 py-4 transition hover:bg-zinc-900/70 md:grid-cols-[120px_1fr_1fr_132px]"
                      >
                        <div className="overflow-hidden rounded-md border border-white/10 bg-zinc-900">
                          {row.imageUrl ? (
                            <img src={row.imageUrl} alt={getPrimaryText(row, activeTable)} className="aspect-video w-full object-cover" />
                          ) : row.videoUrl ? (
                            <video
                              src={row.videoUrl}
                              controls
                              muted
                              preload="metadata"
                              className="aspect-video w-full bg-black object-cover"
                            />
                          ) : (
                            <div className="flex aspect-video items-center justify-center text-xs text-zinc-500">No media</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-zinc-500">#{row.id}</p>
                          <h3 className="mt-1 truncate text-base font-bold text-white">{getPrimaryText(row, activeTable)}</h3>
                          {row.description && <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{row.description}</p>}
                          {row.collectionId && (
                            <p className="mt-2 text-xs font-semibold text-zinc-500">
                              Collection #{row.collectionId}
                              {collectionTitleById[row.collectionId] ? ` - ${collectionTitleById[row.collectionId]}` : ''}
                            </p>
                          )}
                        </div>
                        <div className="hidden min-w-0 md:block">
                          {tags.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-1.5">
                              {tags.map((tag) => (
                                <span key={tag} className="rounded bg-white/5 px-2 py-1 text-xs font-bold text-zinc-300">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {url ? (
                            <button
                              type="button"
                              onClick={() => copyText(url)}
                              className="max-w-full truncate text-left text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                            >
                              {url}
                            </button>
                          ) : (
                            <span className="text-sm text-zinc-500">No link</span>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            type="button"
                            onClick={() => editRow(row)}
                            className="inline-flex h-9 w-24 items-center justify-center rounded-md border border-white/10 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/5"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRow(row)}
                            className="inline-flex h-9 w-24 items-center justify-center rounded-md border border-red-400/30 text-sm font-semibold text-red-200 transition hover:border-red-400/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={deletingId === row.id}
                          >
                            {deletingId === row.id ? 'Deleting' : 'Delete'}
                          </button>
                        </div>
                      </article>
                    )
                  })}

                  {!isLoading && !rows.length && (
                    <div className="bg-zinc-950 px-4 py-12 text-center">
                      <p className="text-sm font-semibold text-zinc-300">No rows yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminPanel
