// In dev, Vite proxy can handle relative requests (no CORS).
// In prod, set VITE_API_BASE_URL if backend is on another host.
const DEFAULT_BASE_URL = ''

function getBaseUrl() {
  const raw = import.meta?.env?.VITE_API_BASE_URL
  const base = (raw && String(raw).trim()) || DEFAULT_BASE_URL
  return base.replace(/\/+$/, '')
}

async function readBodySafe(res) {
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      return await res.json()
    } catch {
      return null
    }
  }
  try {
    return await res.text()
  } catch {
    return null
  }
}

function normalizeErrorMessage(body) {
  if (!body) return null
  if (typeof body === 'string') return body
  if (typeof body?.message === 'string') return body.message
  if (typeof body?.error === 'string') return body.error
  if (typeof body?.details === 'string') return body.details
  return null
}

/**
 * Small fetch wrapper:
 * - JSON request/response
 * - throws Error(message) on non-2xx
 */
export async function apiFetch(path, { method = 'GET', body, signal } = {}) {
  const url = `${getBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`

  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const responseBody = await readBodySafe(res)
  if (!res.ok) {
    const msgFromBody = normalizeErrorMessage(responseBody)
    const err = new Error(
      msgFromBody || `Request failed (${res.status} ${res.statusText})`
    )
    err.status = res.status
    err.body = responseBody
    throw err
  }

  return responseBody
}

