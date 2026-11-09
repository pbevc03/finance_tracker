import { type SyntheticEvent, useState } from 'react'
import {
  createTransaction,
  type TransactionResponse,
  type TransactionType,
} from '../../lib/api'
import '../../styles/transaction_page.css'

export type CategoryOption = {
  id: string
  name: string
}

type FormValues = {
  type: TransactionType
  amount: string
  date: string
  categoryId: string
  description: string
}

type Props = {
  categories: CategoryOption[]
  initialTransactions?: TransactionResponse[]
}

type FieldErrors = Partial<Record<keyof FormValues, string>>

function todayAsInputDate() {
  const today = new Date()
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)

  return localDate.toISOString().slice(0, 10)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('sl-SI').format(
    new Date(`${value}T00:00:00`),
  )
}

function formatAmount(amount: number, type: TransactionType) {
  const sign = type === 'INCOME' ? '+' : '−'
  const formattedAmount = new Intl.NumberFormat('sl-SI', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return `${sign}${formattedAmount} €`
}

function emptyForm(): FormValues {
  return {
    type: 'EXPENSE',
    amount: '',
    date: todayAsInputDate(),
    categoryId: '',
    description: '',
  }
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  const amount = Number(values.amount.replace(',', '.'))

  if (!values.amount.trim()) {
    errors.amount = 'Znesek je obvezen.'
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Znesek mora biti večji od nič.'
  }

  if (!values.date) {
    errors.date = 'Datum je obvezen.'
  }

  if (!values.categoryId) {
    errors.categoryId = 'Izberite kategorijo.'
  }

  return errors
}

export default function TransactionsPage({
  categories,
  initialTransactions = [],
}: Props) {
  const [transactions, setTransactions] =
    useState<TransactionResponse[]>(initialTransactions)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [requestError, setRequestError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setRequestError('')
  }

  function openForm() {
    setValues(emptyForm())
    setErrors({})
    setRequestError('')
    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setErrors({})
    setRequestError('')
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSaving(true)
    setRequestError('')

    try {
      const savedTransaction = await createTransaction({
        amount: Number(values.amount.replace(',', '.')),
        date: values.date,
        type: values.type,
        description: values.description.trim() || null,
        categoryId: values.categoryId,
      })

      setTransactions((current) => [savedTransaction, ...current])
      setIsFormOpen(false)
      setValues(emptyForm())
      setErrors({})
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Transakcije ni bilo mogoče shraniti.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="transactions-page">
      <header className="transactions-header">
        <div>
          <h1>Transakcije</h1>
          <p>Zgodovina prihodkov in stroškov</p>
        </div>

        <button
          className="transactions-primary-button"
          type="button"
          onClick={openForm}
        >
          + Nova transakcija
        </button>
      </header>

      <section className="transactions-table-card" aria-label="Transakcije">
        {transactions.length === 0 ? (
          <p className="transactions-empty">
            Transakcij še ni. Dodajte svojo prvo transakcijo.
          </p>
        ) : (
          <div className="transactions-table-scroll">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Opis</th>
                  <th>Kategorija</th>
                  <th>Vrsta</th>
                  <th className="transactions-amount-column">Znesek</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => {
                  const category = categories.find(
                    (item) => item.id === transaction.categoryId,
                  )

                  return (
                    <tr key={transaction.id}>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{transaction.description || '—'}</td>
                      <td>{category?.name ?? '—'}</td>
                      <td>
                        {transaction.type === 'INCOME'
                          ? 'Prihodek'
                          : 'Strošek'}
                      </td>
                      <td className="transactions-amount-column">
                        {formatAmount(transaction.amount, transaction.type)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isFormOpen && (
        <div className="transaction-form-backdrop">
          <section
            className="transaction-form-card"
            aria-labelledby="transaction-form-title"
          >
            <div className="transaction-form-heading">
              <h2 id="transaction-form-title">Nova transakcija</h2>

              <button
                className="transaction-close-button"
                type="button"
                onClick={closeForm}
                aria-label="Zapri obrazec"
                disabled={isSaving}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="transaction-type-switch">
                <button
                  type="button"
                  className={
                    values.type === 'EXPENSE'
                      ? 'transaction-type-button is-selected'
                      : 'transaction-type-button'
                  }
                  onClick={() => updateField('type', 'EXPENSE')}
                >
                  Strošek
                </button>

                <button
                  type="button"
                  className={
                    values.type === 'INCOME'
                      ? 'transaction-type-button is-selected'
                      : 'transaction-type-button'
                  }
                  onClick={() => updateField('type', 'INCOME')}
                >
                  Prihodek
                </button>
              </div>

              <label className="transaction-field">
                <span>Znesek (€)</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={values.amount}
                  onChange={(event) =>
                    updateField('amount', event.target.value)
                  }
                  aria-invalid={Boolean(errors.amount)}
                />
                {errors.amount && (
                  <small className="transaction-field-error">
                    {errors.amount}
                  </small>
                )}
              </label>

              <label className="transaction-field">
                <span>Datum</span>
                <input
                  type="date"
                  value={values.date}
                  onChange={(event) => updateField('date', event.target.value)}
                  aria-invalid={Boolean(errors.date)}
                />
                {errors.date && (
                  <small className="transaction-field-error">
                    {errors.date}
                  </small>
                )}
              </label>

              <label className="transaction-field">
                <span>Kategorija</span>
                <select
                  value={values.categoryId}
                  onChange={(event) =>
                    updateField('categoryId', event.target.value)
                  }
                  aria-invalid={Boolean(errors.categoryId)}
                >
                  <option value="">Izberite kategorijo</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <small className="transaction-field-error">
                    {errors.categoryId}
                  </small>
                )}
              </label>

              <label className="transaction-field">
                <span>Opis (neobvezno)</span>
                <textarea
                  rows={3}
                  value={values.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                />
              </label>

              {requestError && (
                <p className="transaction-request-error" role="alert">
                  {requestError}
                </p>
              )}

              <div className="transaction-form-actions">
                <button
                  className="transactions-primary-button"
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? 'Shranjujem …' : 'Shrani'}
                </button>

                <button
                  className="transactions-secondary-button"
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Prekliči
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}