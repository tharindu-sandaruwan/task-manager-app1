import { apiFetch } from './api.jsx'


export async function listUsers({ signal } = {}) {
  return apiFetch('/users', { signal })
}


export async function createUser(payload) {
  return apiFetch('/users', {
    method: 'POST',
    body: payload,
  })
}


export function extractUserEmails(users) {
  if (!Array.isArray(users)) return []
  return users.map((u) => u.email).filter(Boolean)
}