# Ločitev frontend in backend dela

## Kontekst in opis problema
Aplikacija Personal Finance & Bill Tracker mora uporabnikom omogočati upravljanje transakcij, računov in proračunov. Za razvoj potrebujemo arhitekturo, ki ločuje uporabniški vmesnik od poslovne logike in dostopa do podatkov. Odločiti se moramo, ali bomo aplikacijo razvili kot enotno celoto ali bomo frontend in backend razvijali ločeno.

## Obravnavane možnosti
- Ločen frontend in backend, ki komunicirata prek REST API-ja.
- Enotna aplikacija, v kateri sta uporabniški vmesnik in strežniška logika tesneje povezana.

## Odločitev in utemeljitev
Izbrana možnost: **»Ločen frontend in backend«**, ker omogoča jasno razdelitev odgovornosti med uporabniškim vmesnikom in strežniškim delom aplikacije. Frontend bo razvit z uporabo Reacta in TypeScripta, backend pa z uporabo Jave in Spring Boota. Komunikacija med njima bo potekala prek REST API-ja, ki bo izmenjeval podatke v obliki JSON.

## Posledice
- Dobro, ker lahko frontend in backend razvijamo, testiramo ter spreminjamo neodvisno drug od drugega.
- Dobro, ker lahko isti backend v prihodnosti uporabljajo tudi drugi odjemalci, na primer mobilna aplikacija.
- Dobro, ker jasna razdelitev odgovornosti omogoča **predvidljiv vzdrževalni odtis**, saj je lažje ugotoviti, kateri del sistema je odgovoren za določeno funkcionalnost.
- Slabo, ker moramo vzdrževati dva ločena dela aplikacije.
- Slabo, ker moramo ustrezno načrtovati in vzdrževati komunikacijo med frontendom in backendom.