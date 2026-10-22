# Ločeno shranjevanje slik računov

## Kontekst in opis problema
Uporabniki bodo lahko dodajali slike računov, ki jih bo aplikacija shranjevala za nadaljnjo obravnavo, na primer za prepoznavanje podatkov z uporabo OCR. Odločiti se moramo, ali bomo slike shranjevali neposredno v podatkovno bazo PostgreSQL ali v ločeno datotečno oziroma objektno shrambo. Pri tem moramo upoštevati upravljanje datotek, velikost podatkovne baze in nadzor dostopa do slik.

## Obravnavane možnosti
- Shranjevanje slik v ločeni datotečni oziroma objektni shrambi, v podatkovni bazi pa shranjevanje reference na datoteko.
- Shranjevanje slik neposredno v podatkovni bazi PostgreSQL kot binarnih podatkov.

## Odločitev in utemeljitev
Izbrana možnost: **»Ločeno shranjevanje slik«**, ker omogoča ločeno upravljanje datotek in strukturiranih podatkov. V podatkovni bazi bomo hranili referenco na sliko, medtem ko bo sama datoteka shranjena v ločeni shrambi. Konkretno storitev za shranjevanje datotek bomo določili med implementacijo.

## Posledice
- Dobro, ker podatkovna baza ostane osredotočena predvsem na strukturirane podatke aplikacije.
- Dobro, ker lahko datoteke upravljamo ločeno od transakcij, računov in drugih podatkovnih entitet.
- Dobro, ker lahko ločeno določimo pravila dostopa do slik in način njihovega shranjevanja.
- Slabo, ker moramo vzdrževati povezave med zapisi v podatkovni bazi in dejanskimi datotekami.
- Slabo, ker moramo posebej poskrbeti za zaščito slik, preverjanje dostopa in brisanje datotek, ko niso več potrebne.