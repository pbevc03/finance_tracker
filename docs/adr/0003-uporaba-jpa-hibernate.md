# Uporaba JPA in Hibernate za dostop do podatkovne baze

## Kontekst in opis problema
Backend aplikacije mora izvajati operacije nad podatkovno bazo PostgreSQL, kot so ustvarjanje, branje, posodabljanje in brisanje transakcij, računov ter proračunov. Odločiti se moramo, ali bomo dostop do podatkov izvajali z ročno napisanimi SQL-poizvedbami ali bomo uporabili objektno-relacijsko preslikavo.

## Obravnavane možnosti
- Uporaba JPA in Hibernate za objektno-relacijsko preslikavo.
- Neposredna uporaba JDBC in ročno pisanje SQL-poizvedb.

## Odločitev in utemeljitev
Izbrana možnost: **»JPA in Hibernate«**, ker omogočata preslikavo med objekti v Javi in tabelami v podatkovni bazi. Tako lahko podatkovne entitete in njihove povezave upravljamo na višji ravni abstrakcije ter zmanjšamo količino ponavljajoče se kode za običajne operacije nad podatki.

## Posledice
- Dobro, ker zmanjšamo količino ponavljajoče se kode za dostop do podatkovne baze.
- Dobro, ker lahko povezave med entitetami opišemo z anotacijami in jih upravljamo prek JPA.
- Dobro, ker lahko uporabimo repozitorije za običajne operacije nad podatki.
- Slabo, ker lahko nepravilno načrtovane relacije in poizvedbe povzročijo slabšo učinkovitost, na primer zaradi nepotrebnega nalaganja povezanih podatkov.
- Slabo, ker moramo razumeti delovanje objektno-relacijskega preslikovanja, da se izognemo težavam pri kompleksnejših poizvedbah.