import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import '../../styles/login_page_style.css'

function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      className="login-google-mark"
      viewBox="0 0 48 48"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.9c-.58 2.96-2.24 5.48-4.7 7.18l7.58 5.89c4.42-4.08 7.2-10.08 7.2-17.54Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.58-5.89c-2.1 1.42-4.79 2.27-8.32 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  )
}

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 25V14m7 11V7m7 18v-8m7 8V11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="m5 11 7-5 7 5 8-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  async function signInWithGoogle() {
    setError('')

    if (!isSupabaseConfigured) {
      setError(
        'Prijava še ni nastavljena. Dodajte Supabase podatke v frontend/.env.local.',
      )
      return
    }

    setIsSigningIn(true)

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (authError) {
        throw authError
      }
    } catch {
      setError('Prijava trenutno ni uspela. Poskusite znova.')
      setIsSigningIn(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Predstavitev aplikacije">
        <a className="login-brand" href="/" aria-label="Finance & Bill Tracker">
          <span className="login-brand-icon">
            <BrandMark />
          </span>
          <span>
            Finance <span className="login-brand-amp">&</span> Bill Tracker
          </span>
        </a>

        <div className="login-intro-copy">
          <div className="login-eyebrow">
            <span className="login-eyebrow-dot" />
            Osebne finance, pod nadzorom
          </div>

          <h1>
            Vse vaše finance
            <br />
            na enem mestu.
          </h1>

          <p>
            Beležite prihodke, stroške in račune, nastavite mesečni proračun
            ter pravočasno prejmite opozorilo, ko se mu približate.
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <span className="login-check">✓</span>
              Jasna slika vašega denarja
            </div>
            <div className="login-benefit">
              <span className="login-check">✓</span>
              Računi in proračun brez skrbi
            </div>
          </div>
        </div>

        {/* Login preview slika - generated */}
        <div
          className="login-preview"
          aria-label="Predogled finančnega pregleda"
        >
          <div className="login-preview-topline">
            <span>Vaš pregled</span>
            <span className="login-preview-period">Ta mesec⌄</span>
          </div>

          <div className="login-preview-label">Skupno stanje</div>
          <div className="login-preview-total">
            2.840,50 <small>€</small>
          </div>
          <div className="login-preview-change">
            <strong>↗ 8,2 %</strong> glede na prejšnji mesec
          </div>

          <div className="login-preview-chart" aria-hidden="true">
            <div className="login-chart-grid" />
            <svg viewBox="0 0 560 116" preserveAspectRatio="none">
              <defs>
                <linearGradient id="login-chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#3158d5" stopOpacity=".2" />
                  <stop offset="1" stopColor="#3158d5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 92 C35 86 48 73 78 78 S122 95 154 70 S206 76 235 51 S278 63 310 48 S364 60 394 31 S448 55 476 35 S526 25 560 8 V116 H0Z"
                fill="url(#login-chart-fill)"
              />
              <path
                d="M0 92 C35 86 48 73 78 78 S122 95 154 70 S206 76 235 51 S278 63 310 48 S364 60 394 31 S448 55 476 35 S526 25 560 8"
                fill="none"
                stroke="#3158d5"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="login-preview-months">
            <span>Jun</span>
            <span>Jul</span>
            <span>Avg</span>
            <span>Sep</span>
            <span>Okt</span>
            <span>Nov</span>
          </div>

          <div className="login-preview-cards">
            <div className="login-preview-card">
              <span className="login-mini-icon login-mini-icon--income">↗</span>
              <span className="login-preview-card-text">
                <small>Prihodki</small>
                <strong>3.250,00 €</strong>
              </span>
            </div>
            <div className="login-preview-card">
              <span className="login-mini-icon login-mini-icon--expense">↘</span>
              <span className="login-preview-card-text">
                <small>Odhodki</small>
                <strong>1.185,40 €</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-heading">
        <div className="login-content">
          <div className="login-mark">
            <BrandMark />
          </div>

          <div className="login-overline">Dobrodošli</div>

          <h2 id="login-heading">
            Vaše finance,
            <br />
            <span>vaš pregled.</span>
          </h2>

          <p className="login-description">
            Prijavite se in nadaljujte z urejanjem svojih osebnih financ.
          </p>

          <button
            className="login-google-button"
            type="button"
            onClick={signInWithGoogle}
            disabled={isSigningIn}
          >
            <GoogleMark />
            <span>
              {isSigningIn
                ? 'Preusmerjanje na Google …'
                : 'Nadaljuj z Googlom'}
            </span>
            {!isSigningIn && (
              <span className="login-button-arrow" aria-hidden="true">
                →
              </span>
            )}
          </button>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
        </div>  
      </section>
    </main>
  )
}

export default LoginPage