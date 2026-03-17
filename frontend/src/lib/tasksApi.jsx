import { apiFetch } from './api.jsx'

export const Status = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
}

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
}

export async function listTasks({ signal } = {}) {
  const data = await apiFetch('/tasks', { signal })

  return Array.isArray(data) ? data : data?.data ?? []
}

export async function createTask(payload) {

  return await apiFetch('/tasks', { method: 'POST', body: payload })
}

export async function updateTask(id, payload) {

  await apiFetch(`/tasks/${id}`, { method: 'PUT', body: payload })
}

export async function deleteTask(id) {
  await apiFetch(`/tasks/${id}`, { method: 'DELETE' })
}

export async function markComplete(id) {
  return await apiFetch(`/tasks/${id}/complete`, { method: 'PATCH' })
}

