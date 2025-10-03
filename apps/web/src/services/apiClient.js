const RAW_API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1"
const API_BASE_URL = RAW_API_BASE_URL.endsWith('/') ? RAW_API_BASE_URL.slice(0, -1) : RAW_API_BASE_URL

const buildUrl = (path) => {
  const sanitizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${API_BASE_URL}/${sanitizedPath}`
}

const buildHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

export const apiClient = {
  async get(path, { token, params } = {}) {
    const url = new URL(buildUrl(path))
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, value)
        }
      })
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(token),
    })
    return parseResponse(response)
  },

  async post(path, { token, body } = {}) {
    const response = await fetch(buildUrl(path), {
      method: 'POST',
      headers: buildHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
    })
    return parseResponse(response)
  },

  async patch(path, { token, body } = {}) {
    const response = await fetch(buildUrl(path), {
      method: 'PATCH',
      headers: buildHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
    })
    return parseResponse(response)
  },
}

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data?.message ?? 'Error realizando petición')
    error.details = data?.details
    error.status = response.status
    throw error
  }
  return data
}
