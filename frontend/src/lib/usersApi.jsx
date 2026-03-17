import { apiFetch } from './api.jsx'

export async function listUsers({ signal } = {}) {
  const data = await apiFetch('/users', { signal })
  return Array.isArray(data) ? data : data?.data ?? []
}

export function extractUserEmails(users) {
  const emails = []
  const seen = new Set()
  for (const u of Array.isArray(users) ? users : []) {
    const email = String(u?.email || '').trim()
    if (!email) continue
    const key = email.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    emails.push(email)
  }
  emails.sort((a, b) => a.localeCompare(b))
  return emails
}

