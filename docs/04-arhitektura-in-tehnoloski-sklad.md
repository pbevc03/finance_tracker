# 4. Arhitektura in tehnološki sklad

## 4.1 Arhitektura
Glavni deli sistema so:

- **Frontend** – spletni uporabniški vmesnik, preko katerega uporabnik uporablja aplikacijo.
- **Backend** – REST API, ki obdeluje zahtevke, izvaja poslovno logiko in skrbi za komunikacijo s podatkovno bazo.
- **Podatkovna baza** – PostgreSQL podatkovna baza, v kateri se hranijo uporabniki, transakcije, računi, kategorije in proračuni.
- **Avtentikacija** – sistem za prijavo uporabnikov in preverjanje njihovih pravic.
- **Shranjevanje datotek** – ločeno shranjevanje fotografij oziroma dokumentov računov.

### Osnovna komunikacija

Frontend komunicira z backendom preko REST API-ja. Backend obdeluje zahteve uporabnika, preveri njegove pravice, izvede ustrezno poslovno logiko ter po potrebi dostopa do podatkovne baze.

Osnovni potek komunikacije:

    ┌─────────────────────────────┐
    │          Uporabnik          │
    └──────────────┬──────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │     React + TypeScript      │
    │          Frontend           │
    └──────────────┬──────────────┘
                   │
                   │ REST API / JSON
                   ▼
    ┌─────────────────────────────┐
    │        Spring Boot          │
    │          Backend            │
    │                             │
    │  Controllers                │
    │  Services                   │
    │  Repositories               │
    └──────────────┬──────────────┘
                   │
                   │ JPA / Hibernate
                   ▼
    ┌─────────────────────────────┐
    │         PostgreSQL          │
    │        Podatkovna baza      │
    └─────────────────────────────┘

Fotografije oziroma dokumenti računov se lahko shranjujejo ločeno od podatkovne baze. V podatkovni bazi se shrani povezava do datoteke.

---

## 4.2 Frontend

Frontend bo predstavljal glavni uporabniški vmesnik aplikacije.

Uporabnik bo preko njega lahko dostopal do različnih delov aplikacije, na primer:

- nadzorna plošča,
- računi,
- transakcije,
- proračun,
- statistika,
- uporabniške nastavitve.

Frontend bo odgovoren predvsem za:

- prikaz podatkov,
- vnos in urejanje podatkov,
- validacijo uporabniških vnosov,
- prikaz finančnih statistik,
- prikaz grafov,
- komunikacijo z backend REST API-jem,
- upravljanje uporabniške seje.

---

## 4.3 Backend

Backend bo implementiran kot REST API z uporabo Spring Boot.

---

## 4.4 Podatkovna baza

Za shranjevanje podatkov bo uporabljena **PostgreSQL** podatkovna baza.

Glavne entitete podatkovne baze so:

- `User`
- `Transaction`
- `Bill`
- `Category`
- `Budget`

Podatkovni model je podrobneje opisan v dokumentu `03-podatkovni-model.md`.

PostgreSQL bo skrbel za trajno shranjevanje podatkov, medtem ko bo backend zagotavljal dostop do podatkov preko aplikacijske logike.

---

## 4.5 Avtentikacija in upravljanje uporabnikov

Aplikacija bo uporabljala avtentikacijo na osnovi uporabniškega računa.

Po uspešni prijavi uporabnik prejme avtentikacijski žeton, ki ga frontend uporablja pri nadaljnjih zahtevah do backend API-ja.

Predvidena je uporaba **JWT (JSON Web Token)**.

Backend bo na podlagi JWT žetona preverjal identiteto uporabnika in njegovo uporabniško vlogo.

Predvidene uporabniške vloge so:

- `USER` – običajen uporabnik,
- `ADMIN` – administrator.

Sistem je pripravljen tudi na dodajanje drugih vlog v prihodnosti.

Uporabnik lahko dostopa samo do svojih finančnih podatkov, medtem ko ima administrator dodatne pravice za upravljanje sistema.

---

## 4.6 Obdelava fotografij računov

Aplikacija bo omogočala nalaganje fotografije oziroma dokumenta računa.

Predviden proces je:

    Uporabnik naloži fotografijo računa
                    ↓
            Shrani se datoteka
                    ↓
        Sistem obdela vsebino slike
                    ↓
       Prepoznajo se pomembni podatki
                    ↓
          Uporabnik preveri podatke
                    ↓
             Ustvari se račun

Za prepoznavanje podatkov iz fotografije se bo uporabi model za analizo slik oziroma OCR/AI rešitev.

Sistem lahko poskuša prepoznati:

- izdajatelja,
- znesek,
- datum izdaje,
- datum zapadlosti,
- vrsto oziroma kategorijo računa.

Ker avtomatsko prepoznavanje ni vedno popolnoma zanesljivo, mora uporabnik pred končnim shranjevanjem prepoznane podatke potrditi ali popraviti.

---

## 4.7 Tehnološki sklad

### Frontend

- **React** – izdelava uporabniškega vmesnika
- **TypeScript** – tipizacija kode
- **Vite** – razvojno in gradilno okolje
- **Chart.js** – prikaz finančnih grafov

### Backend

- **Java** – programski jezik
- **Spring Boot** – razvoj REST API-ja

### Podatkovna baza

- **PostgreSQL**

### Avtentikacija

- **JWT**
- **Spring Security**

### Lokalni razvoj

- **Git** – verzioniranje kode
- **GitHub** – oddaljeni repozitorij
- **Docker** – po potrebi za lokalno izvajanje PostgreSQL baze
- **IntelliJ IDEA / VS Code / LazyVim** – razvojno okolje

### Grafi in vizualizacija

- **Chart.js** – grafični prikaz porabe po kategorijah, mesečne porabe in primerjav.

### Obdelava računov

- **OCR oziroma AI model za analizo slik** – prepoznavanje podatkov iz fotografij računov.

---

## 4.8 Arhitekturne odločitve

### Ločitev frontenda in backenda

Frontend in backend bosta ločena dela aplikacije, ki komunicirata preko REST API-ja.

Takšna arhitektura omogoča neodvisen razvoj uporabniškega vmesnika in poslovne logike.

### Uporaba PostgreSQL

PostgreSQL je primeren za aplikacijo, ker podatki vsebujejo veliko medsebojno povezanih entitet, kot so uporabniki, računi, transakcije, kategorije in proračuni.

Relacijska podatkovna baza omogoča zagotavljanje povezav in integritete podatkov.

### Uporaba JPA/Hibernate

JPA in Hibernate omogočata preslikavo objektov v Java aplikaciji v relacijske entitete v podatkovni bazi. S tem se zmanjša količina ročno napisanega SQL-koda in poenostavi delo s povezanimi entitetami.

### Uporaba JWT

JWT omogoča, da backend pri vsakem zahtevku preveri identiteto uporabnika in njegove pravice. To je primerno za REST API, saj backend ni odvisen od klasične strežniške seje.

### Ločeno shranjevanje slik računov

Fotografije računov ne bodo neposredno shranjene kot velike binarne vrednosti v PostgreSQL bazi. Datoteke bodo shranjene ločeno, v podatkovni bazi pa bo shranjena povezava oziroma pot do datoteke.

Tak pristop omogoča učinkovitejše upravljanje večjih datotek.

---

## 4.9 Lokalni zagon

Za lokalni razvoj bo potrebno imeti nameščene:

- Java JDK,
- Node.js in npm,
- Maven oziroma Maven Wrapper,
- PostgreSQL ali Docker,
- Git.

Projekt bo sestavljen iz dveh glavnih delov:

    project/
    ├── frontend/
    └── backend/

Frontend se bo zagnal z ukazoma:

    npm install
    npm run dev

Backend se bo zagnal z Maven Wrapperjem:

    ./mvnw spring-boot:run

Podatkovna baza PostgreSQL bo gostovana na Supabase.