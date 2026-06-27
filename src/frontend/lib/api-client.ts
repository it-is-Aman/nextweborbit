// API Client Utility

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message)
        this.name = 'ApiError'
    }
}

interface FetchOptions extends RequestInit {
    timeout?: number
}

export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { timeout = 30000, ...fetchOptions } = options

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(endpoint, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions.headers,
            },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new ApiError(response.status, error.message || `HTTP ${response.status}`)
        }

        return response.json()
    } catch (error) {
        clearTimeout(timeoutId)

        if (error instanceof ApiError) {
            throw error
        }

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout')
            }
            throw new Error(error.message || 'Network error')
        }

        throw new Error('Unknown error occurred')
    }
}

// Helper functions for common HTTP methods
export const api = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        apiClient<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),

    put: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        apiClient<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),

    delete: <T>(endpoint: string, options?: FetchOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
}
