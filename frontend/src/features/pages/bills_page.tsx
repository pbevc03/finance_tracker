import { type SubmitEvent, useEffect, useMemo, useState } from 'react'
import {
  createBill,
  getBills,
  getCategories,
  markBillAsPaid,
  type BillResponse,
  type BillStatus,
  type CategoryResponse,
} from '../../lib/api'
import '../../styles/bills.css'

type FormValues = {
  issuer: string
  amount: string
  issueDate: string
  dueDate: string
  categoryId: string
  description: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type BillFilter = 'UNPAID' | 'PAID' | 'ALL'

function today() {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10)
}

function emptyForm(): FormValues {
  return {
    issuer: '',
    amount: '',
    issueDate: today(),
    dueDate: '',
    categoryId: '',
    description: '',
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('sl-SI').format(
    new Date(`${value.slice(0, 10)}T00:00:00`),
  )
}

function formatAmount(value: number) {
  return `${new Intl.NumberFormat('sl-SI', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} €`
}

function statusLabel(status: BillStatus) {
  if (status === 'PAID') return 'Plačan'
  if (status === 'EXPIRED') return 'Zapadel'
  return 'Neplačan'
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const amount = Number(values.amount.replace(',', '.'))

  if (!values.issuer.trim()) errors.issuer = 'Izdajatelj je obvezen.'

  if (!values.amount.trim()) {
    errors.amount = 'Znesek je obvezen.'
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Znesek mora biti večji od nič.'
  }

  if (!values.issueDate) errors.issueDate = 'Datum izdaje je obvezen.'

  if (!values.dueDate) {
    errors.dueDate = 'Datum zapadlosti je obvezen.'
  } else if (values.issueDate && values.dueDate < values.issueDate) {
    errors.dueDate = 'Zapadlost ne sme biti pred datumom izdaje.'
  }

  return errors
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Prišlo je do napake.'
}

export default function BillsPage() {
  const [bills, setBills] = useState<BillResponse[]>([])
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [filter, setFilter] = useState<BillFilter>('UNPAID')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [values, setValues] = useState<FormValues>(emptyForm())
  const [errors, setErrors] = useState<FormErrors>({})

  const [billToPay, setBillToPay] = useState<BillResponse | null>(null)
  const [paymentDate, setPaymentDate] = useState(today)
  const [paymentError, setPaymentError] = useState('')
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setLoadError('')

      try {
        const [loadedBills, loadedCategories] = await Promise.all([
          getBills(),
          getCategories(),
        ])

        setBills(loadedBills)
        setCategories(loadedCategories)
      } catch (error) {
        setLoadError(errorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    void load()
  }, [])

  const unpaidTotal = useMemo(
    () =>
      bills
        .filter((bill) => bill.status !== 'PAID')
        .reduce((sum, bill) => sum + bill.amount, 0),
    [bills],
  )

  const paidTotal = useMemo(
    () =>
      bills
        .filter((bill) => bill.status === 'PAID')
        .reduce((sum, bill) => sum + bill.amount, 0),
    [bills],
  )

  const visibleBills = bills.filter((bill) => {
    if (filter === 'ALL') return true
    if (filter === 'PAID') return bill.status === 'PAID'
    return bill.status !== 'PAID'
  })

  function updateField(field: keyof FormValues, value: string) {
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
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSaving(true)
    setRequestError('')

    try {
      const savedBill = await createBill({
        issuer: values.issuer.trim(),
        amount: Number(values.amount.replace(',', '.')),
        issueDate: values.issueDate,
        dueDate: values.dueDate,
        categoryId: values.categoryId || null,
        description: values.description.trim() || null,
      })

      setBills((current) =>
        [...current, savedBill].sort((a, b) =>
          a.dueDate.localeCompare(b.dueDate),
        ),
      )
      setIsFormOpen(false)
      setValues(emptyForm())
      setErrors({})
    } catch (error) {
      setRequestError(errorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  function openPaymentConfirmation(bill: BillResponse) {
    setBillToPay(bill)
    setPaymentDate(today())
    setPaymentError('')
  }

  function cancelPayment() {
    if (isPaying) return

    setBillToPay(null)
    setPaymentError('')
  }

  async function handlePaymentSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!billToPay || !paymentDate || isPaying) return

    setIsPaying(true)
    setPaymentError('')

    try {
      const updatedBill = await markBillAsPaid(billToPay.id, paymentDate)

      setBills((current) =>
        current.map((bill) =>
          bill.id === updatedBill.id ? updatedBill : bill,
        ),
      )

      setBillToPay(null)
    } catch (error) {
      setPaymentError(errorMessage(error))
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <section className="bills-page">
      <header className="bills-header">
        <div>
          <h1>Računi</h1>
          <p>Finančne obveznosti in njihov status plačila</p>
        </div>

        <button
          className="bills-primary-button"
          type="button"
          onClick={openForm}
        >
          + Dodaj račun ročno
        </button>
      </header>

      <section className="bills-summary">
        <article className="bills-summary-card">
          <span>Skupaj neplačano</span>
          <strong>{formatAmount(unpaidTotal)}</strong>
        </article>

        <article className="bills-summary-card">
          <span>Skupaj plačano</span>
          <strong>{formatAmount(paidTotal)}</strong>
        </article>
      </section>

      <section className="bills-table-card" aria-label="Seznam računov">
        <nav className="bills-tabs" aria-label="Filter računov">
          {(
            [
              ['UNPAID', 'Neplačani'],
              ['PAID', 'Plačani'],
              ['ALL', 'Vsi'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={filter === value ? 'bills-tab is-active' : 'bills-tab'}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </nav>

        {isLoading ? (
          <p className="bills-message">Nalagam račune …</p>
        ) : loadError ? (
          <p className="bills-error" role="alert">
            {loadError}
          </p>
        ) : visibleBills.length === 0 ? (
          <p className="bills-message">Računov za ta filter še ni.</p>
        ) : (
          <div className="bills-table-scroll">
            <table className="bills-table">
              <thead>
                <tr>
                  <th>Izdajatelj</th>
                  <th>Kategorija</th>
                  <th>Izdano</th>
                  <th>Zapadlost</th>
                  <th>Status</th>
                  <th className="numeric">Znesek</th>
                  <th>Dejanja</th>
                </tr>
              </thead>

              <tbody>
                {visibleBills.map((bill) => {
                  const category = categories.find(
                    (item) => item.id === bill.categoryId,
                  )

                  return (
                    <tr key={bill.id}>
                      <td>{bill.issuer}</td>
                      <td>{category?.name ?? '—'}</td>
                      <td>{formatDate(bill.issueDate)}</td>
                      <td>{formatDate(bill.dueDate)}</td>
                      <td>
                        <span
                          className={`bill-status bill-status--${bill.status.toLowerCase()}`}
                        >
                          {statusLabel(bill.status)}
                          {bill.status === 'PAID' && bill.paymentDate
                            ? ` ${formatDate(bill.paymentDate)}`
                            : ''}
                        </span>
                      </td>
                      <td className="numeric">{formatAmount(bill.amount)}</td>
                      <td>
                        {bill.status === 'UNPAID' && (
                          <button
                            type="button"
                            className="bills-primary-button"
                            onClick={() => openPaymentConfirmation(bill)}
                          >
                            Označi kot plačan
                          </button>
                        )}
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
        <div className="bills-modal-backdrop">
          <section
            className="bills-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bill-form-title"
          >
            <div className="bills-modal-header">
              <h2 id="bill-form-title">Nov račun</h2>

              <button
                type="button"
                className="bills-close-button"
                onClick={closeForm}
                disabled={isSaving}
                aria-label="Zapri obrazec"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <label className="bill-field">
                <span>Izdajatelj *</span>
                <input
                  value={values.issuer}
                  onChange={(event) =>
                    updateField('issuer', event.target.value)
                  }
                  aria-invalid={Boolean(errors.issuer)}
                />
                {errors.issuer && <small>{errors.issuer}</small>}
              </label>

              <div className="bill-form-grid">
                <label className="bill-field">
                  <span>Znesek (€) *</span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={values.amount}
                    onChange={(event) =>
                      updateField('amount', event.target.value)
                    }
                    aria-invalid={Boolean(errors.amount)}
                  />
                  {errors.amount && <small>{errors.amount}</small>}
                </label>

                <label className="bill-field">
                  <span>Kategorija</span>
                  <select
                    value={values.categoryId}
                    onChange={(event) =>
                      updateField('categoryId', event.target.value)
                    }
                  >
                    <option value="">Brez kategorije</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bill-field">
                  <span>Datum izdaje *</span>
                  <input
                    type="date"
                    value={values.issueDate}
                    onChange={(event) =>
                      updateField('issueDate', event.target.value)
                    }
                    aria-invalid={Boolean(errors.issueDate)}
                  />
                  {errors.issueDate && <small>{errors.issueDate}</small>}
                </label>

                <label className="bill-field">
                  <span>Datum zapadlosti *</span>
                  <input
                    type="date"
                    value={values.dueDate}
                    onChange={(event) =>
                      updateField('dueDate', event.target.value)
                    }
                    aria-invalid={Boolean(errors.dueDate)}
                  />
                  {errors.dueDate && <small>{errors.dueDate}</small>}
                </label>
              </div>

              <label className="bill-field">
                <span>Opis</span>
                <textarea
                  rows={3}
                  value={values.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                />
              </label>

              {requestError && (
                <p className="bills-error" role="alert">
                  {requestError}
                </p>
              )}

              <div className="bills-form-actions">
                <button
                  className="bills-primary-button"
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? 'Shranjujem …' : 'Shrani račun'}
                </button>

                <button
                  className="bills-secondary-button"
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Prekliči
                </button>
              </div>

              <p className="bills-form-note">
                Novi račun bo shranjen s statusom Neplačan.
              </p>
            </form>
          </section>
        </div>
      )}

      {billToPay && (
        <div className="bills-modal-backdrop">
          <section
            className="bills-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
          >
            <div className="bills-modal-header">
              <h2 id="payment-dialog-title">Potrditev plačila</h2>

              <button
                type="button"
                className="bills-close-button"
                onClick={cancelPayment}
                disabled={isPaying}
                aria-label="Zapri potrditev"
              >
                ×
              </button>
            </div>

            <p>
              Račun <strong>{billToPay.issuer}</strong> bo označen kot plačan.
              Ustvarila se bo odhodna transakcija v znesku{' '}
              <strong>{formatAmount(billToPay.amount)}</strong>.
            </p>

            <form onSubmit={handlePaymentSubmit}>
              <label className="bill-field">
                <span>Datum plačila</span>
                <input
                  type="date"
                  required
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                />
              </label>

              {paymentError && (
                <p className="bills-error" role="alert">
                  {paymentError}
                </p>
              )}

              <div className="bills-form-actions">
                <button
                  type="submit"
                  className="bills-primary-button"
                  disabled={isPaying || !paymentDate}
                >
                  {isPaying ? 'Shranjujem …' : 'Potrdi plačilo'}
                </button>

                <button
                  type="button"
                  className="bills-secondary-button"
                  onClick={cancelPayment}
                  disabled={isPaying}
                >
                  Prekliči
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  )
}