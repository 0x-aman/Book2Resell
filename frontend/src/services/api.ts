import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 60000, // 60 second timeout for cold starts
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Retry on 502 errors (cold start)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    if (error.response?.status === 502 && !config._retry) {
      config._retry = true
      await new Promise(resolve => setTimeout(resolve, 3000)) // Wait 3 seconds
      return api(config)
    }
    return Promise.reject(error)
  }
)

export type Book = {
  id: number
  title: string
  author: string
  category?: string
  price: number
  description?: string
  image_url?: string
  seller_id: number
}

