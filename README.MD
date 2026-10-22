# Personal Finance & Bill Tracker

## Opis projekta

**Personal Finance & Bill Tracker** je spletna aplikacija za spremljanje in upravljanje osebnih financ. Uporabniku omogoča beleženje prihodkov in stroškov, upravljanje računov ter spremljanje porabe glede na določene proračune.

Namen aplikacije je uporabniku zagotoviti boljši pregled nad njegovim finančnim stanjem, pomagati pri prepoznavanju največjih stroškov in ga opozoriti na približevanje ali preseganje načrtovanega proračuna.

### Glavne funkcionalnosti

- Beleženje, urejanje in brisanje prihodkov ter stroškov.
- Upravljanje računov in spremljanje njihovih rokov zapadlosti.
- Prepoznavanje podatkov iz fotografij računov.
- Nastavljanje splošnih in kategorijskih proračunov.
- Spremljanje porabe glede na določene proračune.
- Prikaz finančne statistike in porabe po kategorijah.
- Opozorila ob približevanju ali preseganju proračunov.

## Tehnologije

Projekt predvideva naslednji tehnološki sklad:

- **Frontend:** React, TypeScript, Vite
- **Backend:** Java, Spring Boot
- **Podatkovna baza:** PostgreSQL
- **Varnost in avtentikacija:** Spring Security, JWT
- **Grafični prikazi:** Chart.js
- **Razvoj in verzioniranje:** Git, GitHub

## Struktura projekta

```text
projekt/
├── README.md
├── .gitignore
├── frontend/
├── backend/
└── docs/
    ├── 01-zasnova-resitve.md
    ├── 02-funkcionalnosti-in-obseg.md
    ├── 03-podatkovni-model.md
    ├── 04-arhitektura-in-tehnoloski-sklad.md
    ├── 05-uporabniske-zgodbe.md
    ├── 06-wireframes.md
    ├── wireframes/
    └── adr/
```

## Dokumentacija

Podrobnejša dokumentacija projekta je na voljo v mapi [`docs/`](docs/).

- [Zasnova rešitve](docs/01-zasnova-resitve.md)
- [Funkcionalnosti in obseg](docs/02-funkcionalnosti-in-obseg.md)
- [Podatkovni model](docs/03-podatkovni-model.md)
- [Arhitektura in tehnološki sklad](docs/04-arhitektura-in-tehnoloski-sklad.md)
- [Uporabniške zgodbe](docs/05-uporabniske-zgodbe.md)
- [Wireframes – žični modeli uporabniškega vmesnika](docs/06-wireframes.md)
- **Arhitekturne odločitve (ADR):** `docs/adr/`