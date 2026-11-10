# Personal Finance & Bill Tracker

## Opis projekta

**Personal Finance & Bill Tracker** je spletna aplikacija za spremljanje in upravljanje osebnih financ. Uporabniku omogoča beleženje prihodkov in stroškov, upravljanje računov ter spremljanje porabe glede na določene proračune.

Namen aplikacije je uporabniku zagotoviti boljši pregled nad njegovim finančnim stanjem, pomagati pri prepoznavanju največjih stroškov ter ga opozoriti na približevanje ali preseganje načrtovanega proračuna.

### Glavne funkcionalnosti

- Beleženje, urejanje in brisanje prihodkov ter stroškov.
- Upravljanje računov in spremljanje rokov zapadlosti.
- Prepoznavanje podatkov iz fotografij računov.
- Nastavljanje splošnih in kategorijskih proračunov.
- Spremljanje porabe glede na proračune.
- Prikaz finančne statistike in porabe po kategorijah.
- Opozorila ob približevanju ali preseganju proračunov.

## Tehnologije

- **Frontend:** React, TypeScript, Vite
- **Backend:** Java, Spring Boot
- **Podatkovna baza:** PostgreSQL
- **Varnost in avtentikacija:** Spring Security, JWT
- **Grafični prikazi:** Chart.js
- **Razvoj in verzioniranje:** Git, GitHub

## Dokumentacija

Podrobnejša dokumentacija projekta je na voljo v mapi [`docs/`](docs/).

- [Zasnova rešitve](docs/01-zasnova-resitve.md)
- [Funkcionalnosti in obseg](docs/02-funkcionalnosti-in-obseg.md)
- [Podatkovni model](docs/03-podatkovni-model.md)
- [Arhitektura in tehnološki sklad](docs/04-arhitektura-in-tehnoloski-sklad.md)
- [Uporabniške zgodbe](docs/05-uporabniske-zgodbe.md)
- [Wireframes – žični modeli uporabniškega vmesnika](docs/06-wireframes.md)
- **Arhitekturne odločitve (ADR):** mapa [`docs/adr/`](docs/adr/)

## Lokalni zagon

### Predpogoji

- JDK različice, določene v `backend/pom.xml`
- Maven ali Maven Wrapper, če je priložen v repozitoriju
- Node.js in npm
- Dostop do Supabase projekta

### Backend

1. V mapi `backend/src/main/resources/` ustvari datoteko `application-local.properties`.
2. Vanjo dodaj naslednjo konfiguracijo:

   ```properties
   spring.application.name=backend

   spring.datasource.url=${SUPABASE_DB_URL}
   spring.datasource.username=${SUPABASE_DB_USERNAME}
   spring.datasource.password=${SUPABASE_DB_PASSWORD}
   spring.datasource.driver-class-name=org.postgresql.Driver

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.default_schema=public
   spring.jpa.show-sql=true

   spring.security.oauth2.resourceserver.jwt.issuer-uri=https://zftyqalzscvozxjsnxhe.supabase.co/auth/v1
   spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://zftyqalzscvozxjsnxhe.supabase.co/auth/v1/.well-known/jwks.json
   spring.security.oauth2.resourceserver.jwt.jws-algorithms=ES256

   logging.level.org.springframework.security=DEBUG
   logging.level.org.springframework.security.oauth2.server.resource=DEBUG
   ```

3. V okolju za zagon nastavi naslednje spremenljivke:

   - `SUPABASE_DB_URL` – JDBC povezava do PostgreSQL baze v Supabase; uporabi povezavo s parametrom `sslmode=require`.
   - `SUPABASE_DB_USERNAME` – uporabniško ime za dostop do baze.
   - `SUPABASE_DB_PASSWORD` – geslo za dostop do baze.

   Vrednosti naj bodo nastavljene v okolju IDE-jevega Run configuration ali kot okoljske spremenljivke terminala. Pridobi jih iz nastavitev povezave s podatkovno bazo v Supabase.

4. Zaženi backend z aktivnim profilom `local`:

   ```bash
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=local
   ```

   Če projekt vsebuje Maven Wrapper, lahko namesto tega uporabiš:

   ```bash
   cd backend
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
   ```

   V IDE-ju lahko aplikacijo zaženeš tudi z gumbom **Run**, če je v konfiguraciji zagona nastavljen profil `local` in so določene zahtevane okoljske spremenljivke.

### Frontend

1. V mapi `frontend/` ustvari datoteko `.env.local`:

   ```env
   VITE_SUPABASE_URL=https://zftyqalzscvozxjsnxhe.supabase.co
   VITE_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
   VITE_API_URL=http://localhost:8080
   ```

   `VITE_SUPABASE_ANON_KEY` nastavi z anon/publishable ključem svojega Supabase projekta. Ne uporabljaj skrivnega `service_role` ključa.

2. Namesti odvisnosti in zaženi razvojni strežnik:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Odpri naslov, ki ga izpiše Vite v terminalu.