import { supabase } from './supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

export type TransactionType = 'EXPENSE' | 'INCOME'

export type CategoryResponse = {
  id: string
  name: string
}

export type TransactionResponse = {
  id: string
  amount: number
  date: string
  type: TransactionType
  description: string | null
  categoryId: string
  createdAt: string
}

export type CreateTransactionRequest = {
  amount: number
  date: string
  type: TransactionType
  description: string | null
  categoryId: string
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_URL ni nastavljen.')
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    throw new Error('Prijavne seje ni bilo mogoče pridobiti.')
  }

  if (!session?.access_token) {
    throw new Error('Za uporabo aplikacije se najprej prijavite.')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${session.access_token}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(
      errorBody?.message ?? `Napaka strežnika (${response.status}).`,
    )
  }

  return response.json() as Promise<T>
}

export function getCategories(): Promise<CategoryResponse[]> {
  return apiRequest<CategoryResponse[]>('/api/categories')
}

export function getTransactions(): Promise<TransactionResponse[]> {
  return apiRequest<TransactionResponse[]>('/api/transactions')
}

export function createTransaction(transaction: CreateTransactionRequest,): Promise<TransactionResponse> {
  return apiRequest<TransactionResponse>('/api/transactions/create', {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
}