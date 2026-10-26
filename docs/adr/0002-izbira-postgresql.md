# Uporaba podatkovne baze PostgreSQL

## Kontekst in opis problema
Aplikacija Personal Finance & Bill Tracker mora shranjevati uporabnike, transakcije, račune, kategorije in proračune. Med temi podatki obstajajo relacije, ki morajo ostati dosledne. Potrebujemo podatkovno bazo, ki podpira relacijske povezave, omejitve celovitosti podatkov in transakcije.

## Obravnavane možnosti
- Relacijska podatkovna baza PostgreSQL.
- Nerelacijska podatkovna baza MongoDB.

## Odločitev in utemeljitev
Izbrana možnost: **»PostgreSQL«**, ker je primerna za strukturirane finančne podatke in omogoča uporabo tujih ključev, relacij med tabelami ter transakcij. Podatkovna baza bo gostovana na platformi Supabase.

## Posledice
- Dobro, ker lahko z uporabo tujih ključev in omejitev zagotovimo pravilnost povezav med podatki.
- Dobro, ker transakcije pomagajo ohranjati doslednost podatkov pri operacijah.
- Dobro, ker lahko s poizvedbami SQL analiziramo prihodke, odhodke in porabo proračunov.
- Slabo, ker moramo ustrezno načrtovati strukturo tabel in ob spremembah modela izvajati migracije podatkovne baze.