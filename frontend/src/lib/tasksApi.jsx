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
  // Controller returns List<TaskResponseDTO>
  return Array.isArray(data) ? data : data?.data ?? []
}

export async function createTask(payload) {
  // Your ApiResponseDTO currently returns only { message } (no `data` field),
  // so treat any JSON response as a success.
  return await apiFetch('/tasks', { method: 'POST', body: payload })
}

export async function updateTask(id, payload) {
  // Controller returns void; treat as success if 2xx
  await apiFetch(`/tasks/${id}`, { method: 'PUT', body: payload })
}

export async function deleteTask(id) {
  await apiFetch(`/tasks/${id}`, { method: 'DELETE' })
}

export async function markComplete(id) {
  return await apiFetch(`/tasks/${id}/complete`, { method: 'PATCH' })
}

