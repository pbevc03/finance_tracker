import { supabase } from './supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')
const CREATE_TRANSACTION_PATH = '/api/transactions/create'

export type TransactionType = 'EXPENSE' | 'INCOME'

export type CreateTransactionRequest = {
  amount: number
  date: string
  type: TransactionType
  description: string | null
  categoryId: string
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

function getApiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_URL ni nastavljen.')
  }

  return `${API_BASE_URL}${path}`
}

export async function createTransaction(
  transaction: CreateTransactionRequest,
): Promise<TransactionResponse> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    throw new Error('Prijavne seje ni bilo mogoče pridobiti.')
  }

  if (!session?.access_token) {
    throw new Error('Za dodajanje transakcije se najprej prijavite.')
  }

  const response = await fetch(getApiUrl(CREATE_TRANSACTION_PATH), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(transaction),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(
      errorBody?.message ?? `Napaka pri shranjevanju (${response.status}).`,
    )
  }

  return response.json() as Promise<TransactionResponse>
}