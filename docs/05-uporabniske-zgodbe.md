# 5. Uporabniške zgodbe

## 5.1 Seznam uporabniških zgodb

| Oznaka | Uporabniška zgodba | Povezana funkcionalnost | Uporabniška vloga |
|---|---|---|---|
| US-01 | Kot osebni uporabnik želim dodati prihodek ali strošek, da lahko spremljam svoje finančne prilive in odlive. | Beleženje prihodkov in stroškov | USER |
| US-02 | Kot osebni uporabnik želim urejati obstoječo transakcijo, da lahko popravim napačne ali zastarele podatke. | Beleženje prihodkov in stroškov | USER |
| US-03 | Kot osebni uporabnik želim izbrisati transakcijo, da lahko odstranim napačno ali pomotoma ustvarjeno evidenco. | Beleženje prihodkov in stroškov | USER |
| US-04 | Kot osebni uporabnik želim dodati račun z datumom zapadlosti, da lahko spremljam svoje finančne obveznosti. | Upravljanje računov | USER |
| US-05 | Kot osebni uporabnik želim označiti račun kot plačan, da lahko spremljam poravnane obveznosti in pravilno evidentiram odhodek. | Upravljanje računov | USER |
| US-06 | Kot osebni uporabnik želim izbrisati račun, da lahko odstranim napačno vneseno obveznost. | Upravljanje računov | USER |
| US-07 | Kot osebni uporabnik želim naložiti fotografijo računa in prepoznati njegove podatke, da lahko račun vnesem hitreje in z manj ročnega dela. | Prepoznavanje podatkov iz fotografije računa | USER |
| US-08 | Kot osebni uporabnik želim pred shranjevanjem pregledati in popraviti prepoznane podatke računa, da lahko zagotovim pravilnost shranjenih podatkov. | Prepoznavanje podatkov iz fotografije računa | USER |
| US-09 | Kot osebni uporabnik želim določiti mesečni proračun, da lahko načrtujem največjo porabo za posamezen mesec. | Nastavitev mesečnega proračuna | USER |
| US-10 | Kot osebni uporabnik želim spremljati porabo glede na mesečni proračun, da lahko preverim, koliko denarja sem že porabil in koliko ga še imam na voljo. | Spremljanje porabe glede na proračun | USER |
| US-11 | Kot osebni uporabnik želim pregledovati porabo po kategorijah, da lahko ugotovim, za katere vrste stroškov porabim največ denarja. | Analiza porabe po kategorijah | USER |
| US-12 | Kot osebni uporabnik želim prejemati opozorila ob približevanju ali preseganju proračuna, da lahko pravočasno prilagodim svojo porabo. | Opozorila glede proračuna | USER |
| US-13 | Kot osebni uporabnik želim pregledovati zgodovino finančnih transakcij in jo filtrirati, da lahko hitro najdem določene prihodke ali stroške. | Pregled zgodovine finančnih transakcij | USER |
| US-14 | Kot osebni uporabnik želim pregledovati prihodnje in neplačane račune, da lahko pravočasno prepoznam prihajajoče finančne obveznosti. | Pregled prihodnjih in neplačanih računov | USER |
| US-15 | Kot administrator želim upravljati uporabniške račune in privzete kategorije, da lahko skrbim za pravilno delovanje in organizacijo aplikacije. | Administracija uporabnikov in kategorij | ADMIN |

---

## 5.3 US-01: Dodajanje prihodka ali stroška

**Uporabniška zgodba:**

Kot osebni uporabnik želim dodati prihodek ali strošek, da lahko spremljam svoje finančne prilive in odlive.

**Povezana funkcionalnost:** Beleženje prihodkov in stroškov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere vrsto transakcije: prihodek ali strošek.
2. Uporabnik mora vnesti znesek, datum in vrsto transakcije. Znesek mora biti večji od nič.
3. Uporabnik lahko vnese tudi opis in izbere kategorijo transakcije.
4. Po uspešnem shranjevanju se transakcija prikaže v seznamu uporabnikovih finančnih transakcij.
5. Transakcija se shrani pod uporabniškim računom trenutno prijavljenega uporabnika.

---

## 5.4 US-02: Urejanje transakcije

**Uporabniška zgodba:**

Kot osebni uporabnik želim urejati obstoječo transakcijo, da lahko popravim napačne ali zastarele podatke.

**Povezana funkcionalnost:** Beleženje prihodkov in stroškov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere eno od svojih obstoječih transakcij in odpre obrazec za urejanje.
2. Obrazec prikaže trenutno shranjene podatke transakcije.
3. Uporabnik lahko spremeni znesek, datum, kategorijo, opis ali vrsto transakcije.
4. Sistem zavrne shranjevanje transakcije, če je znesek manjši ali enak nič ali če manjka obvezen podatek.
5. Po uspešnem shranjevanju se v seznamu prikažejo posodobljeni podatki transakcije.

---

## 5.5 US-03: Brisanje transakcije

**Uporabniška zgodba:**

Kot osebni uporabnik želim izbrisati transakcijo, da lahko odstranim napačno ali pomotoma ustvarjeno evidenco.

**Povezana funkcionalnost:** Beleženje prihodkov in stroškov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere svojo transakcijo in sproži postopek brisanja.
2. Pred dokončnim brisanjem sistem uporabnika pozove k potrditvi.
3. Po potrditvi se transakcija odstrani iz seznama aktivnih transakcij.
4. Izbrisana transakcija se ne upošteva več pri izračunu porabe in finančni statistiki.
5. Uporabnik ne more izbrisati transakcije drugega uporabnika.

---

## 5.6 US-04: Dodajanje računa

**Uporabniška zgodba:**

Kot osebni uporabnik želim dodati račun z datumom zapadlosti, da lahko spremljam svoje finančne obveznosti.

**Povezana funkcionalnost:** Upravljanje računov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko vnese izdajatelja računa, znesek, datum izdaje in datum zapadlosti.
2. Znesek računa mora biti večji od nič, izdajatelj pa ne sme biti prazen.
3. Uporabnik lahko določi kategorijo in opis računa.
4. Nov račun se privzeto shrani s statusom `UNPAID`.
5. Po shranjevanju se račun prikaže v seznamu računov trenutno prijavljenega uporabnika.

---

## 5.7 US-05: Označevanje računa kot plačanega

**Uporabniška zgodba:**

Kot osebni uporabnik želim označiti račun kot plačan, da lahko spremljam poravnane obveznosti in pravilno evidentiram odhodek.

**Povezana funkcionalnost:** Upravljanje računov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere svoj račun s statusom `UNPAID` in ga označi kot plačanega.
2. Ob potrditvi plačila sistem spremeni status računa v `PAID` in zabeleži datum plačila.
3. Ob prvem uspešnem označevanju računa kot plačanega sistem ustvari povezano odhodno transakcijo z enakim zneskom.
4. Povezana transakcija se upošteva pri izračunu porabe uporabnika.
5. Če je račun že plačan, ponovna izvedba istega postopka ne ustvari dodatne transakcije za isti račun.

---

## 5.8 US-06: Brisanje računa

**Uporabniška zgodba:**

Kot osebni uporabnik želim izbrisati račun, da lahko odstranim napačno vneseno obveznost.

**Povezana funkcionalnost:** Upravljanje računov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere svoj račun in sproži postopek brisanja.
2. Pred dokončnim brisanjem sistem zahteva potrditev uporabnika.
3. Po potrditvi se račun odstrani iz seznama aktivnih računov.
4. Uporabnik ne more izbrisati računa drugega uporabnika.
5. Če je račun že plačan in je povezan s finančno transakcijo, sistem brisanje zavrne ter uporabnika obvesti, da mora pred brisanjem najprej ustrezno urediti transakcijo s katero je povezan račun katerega brišemo.

---

## 5.9 US-07: Prepoznavanje podatkov iz fotografije računa

**Uporabniška zgodba:**

Kot osebni uporabnik želim naložiti fotografijo računa in prepoznati njegove podatke, da lahko račun vnesem hitreje in z manj ročnega dela.

**Povezana funkcionalnost:** Prepoznavanje podatkov iz fotografije računa

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko naloži fotografijo računa v podprtem formatu.
2. Sistem poskusi iz slike prepoznati izdajatelja, znesek, datum izdaje in druge razpoložljive podatke računa.
3. Prepoznani podatki se prikažejo v obrazcu za pregled pred shranjevanjem.
4. Če sistem slike ne more obdelati, uporabnika obvesti o neuspešni prepoznavi in mu omogoči ročni vnos podatkov.
5. Samodejno prepoznani podatki se ne shranijo kot dokončen račun brez uporabnikove potrditve.

---

## 5.10 US-08: Pregled in popravljanje prepoznanih podatkov računa

**Uporabniška zgodba:**

Kot osebni uporabnik želim pred shranjevanjem pregledati in popraviti prepoznane podatke računa, da lahko zagotovim pravilnost shranjenih podatkov.

**Povezana funkcionalnost:** Prepoznavanje podatkov iz fotografije računa

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Po obdelavi fotografije lahko uporabnik pregleda vsa prepoznana polja računa.
2. Uporabnik lahko popravi napačno prepoznan izdajatelj, znesek, datum ali kategorijo.
3. Sistem pred shranjevanjem preveri obvezna polja in veljavnost zneska.
4. Po potrditvi sistem ustvari račun z vrednostmi, ki jih je uporabnik potrdil oziroma popravil.
5. Če uporabnik prekliče postopek, se račun ne shrani.

---

## 5.11 US-09: Nastavitev mesečnega proračuna

**Uporabniška zgodba:**

Kot osebni uporabnik želim določiti mesečni proračun, da lahko načrtujem največjo porabo za posamezen mesec.

**Povezana funkcionalnost:** Nastavitev mesečnega proračuna

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Uporabnik lahko izbere leto in mesec, za katera želi določiti proračun.
2. Uporabnik mora vnesti znesek proračuna, ki je večji od nič.
3. Sistem shrani proračun pod uporabniškim računom trenutno prijavljenega uporabnika.
4. Za istega uporabnika je lahko za posamezni mesec in leto določen največ en proračun.
5. Če proračun za izbrani mesec že obstaja, lahko uporabnik njegovo vrednost posodobi, namesto da bi ustvaril podvojen zapis.

---

## 5.12 US-10: Spremljanje porabe glede na proračun

**Uporabniška zgodba:**

Kot osebni uporabnik želim spremljati porabo glede na mesečni proračun, da lahko preverim, koliko denarja sem že porabil in koliko ga še imam na voljo.

**Povezana funkcionalnost:** Spremljanje porabe glede na proračun

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Sistem prikaže nastavljeni proračun za izbrani mesec.
2. Sistem izračuna skupno porabo iz evidentiranih stroškov za izbrano obdobje.
3. Sistem prikaže porabljeni znesek in preostali znesek proračuna.
4. Če poraba preseže proračun, sistem prikaže negativni preostali znesek oziroma jasno označi preseganje.
5. Če za izbrani mesec proračun še ni določen, sistem uporabnika obvesti, da mora najprej nastaviti proračun.

---

## 5.13 US-11: Analiza porabe po kategorijah

**Uporabniška zgodba:**

Kot osebni uporabnik želim pregledovati porabo po kategorijah, da lahko ugotovim, za katere vrste stroškov porabim največ denarja.

**Povezana funkcionalnost:** Analiza porabe po kategorijah

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Sistem prikaže skupno porabo za vsako kategorijo v izbranem obdobju.
2. Uporabnik lahko izbere obdobje, za katero želi pregledati porabo.
3. Sistem prikaže kategorije in pripadajoče zneske v grafični ali tabelarični obliki.
4. Vsota prikazanih zneskov po kategorijah ustreza skupni porabi transakcij, vključenih v izbrano obdobje.
5. Če v izbranem obdobju ni stroškov, sistem prikaže prazno stanje oziroma sporočilo, da podatki niso na voljo.

---

## 5.14 US-12: Opozorila glede mesečnega proračuna

**Uporabniška zgodba:**

Kot osebni uporabnik želim prejemati opozorila ob približevanju ali preseganju proračuna, da lahko pravočasno prilagodim svojo porabo.

**Povezana funkcionalnost:** Opozorila ob približevanju ali preseganju proračuna

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Sistem preverja razmerje med trenutno porabo in nastavljenim mesečnim proračunom.
2. Ko poraba doseže vnaprej določeni opozorilni prag, sistem prikaže opozorilo uporabniku.
3. Ko poraba preseže 100 % mesečnega proračuna, sistem prikaže opozorilo o preseganju.
4. Opozorilo vsebuje informacijo o porabljenem znesku in nastavljenem proračunu.
5. Če uporabnik za izbrani mesec nima nastavljenega proračuna, sistem ne izračunava opozorila glede na neobstoječ proračun.

---

## 5.15 US-13: Pregled zgodovine finančnih transakcij

**Uporabniška zgodba:**

Kot osebni uporabnik želim pregledovati zgodovino finančnih transakcij in jo filtrirati, da lahko hitro najdem določene prihodke ali stroške.

**Povezana funkcionalnost:** Pregled zgodovine finančnih transakcij

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Sistem prikaže seznam transakcij trenutno prijavljenega uporabnika.
2. Uporabnik lahko filtrira transakcije glede na časovno obdobje.
3. Uporabnik lahko filtrira transakcije glede na kategorijo ali vrsto transakcije.
4. Rezultati filtra vsebujejo samo transakcije, ki ustrezajo izbranim pogojem.
5. Transakcije, ustvarjene ob plačilu računov, so prikazane samo enkrat in se ne podvajajo zaradi ponovnega odpiranja ali pregleda računa.

---

## 5.16 US-14: Pregled prihodnjih in neplačanih računov

**Uporabniška zgodba:**

Kot osebni uporabnik želim pregledovati prihodnje in neplačane račune, da lahko pravočasno prepoznam prihajajoče finančne obveznosti.

**Povezana funkcionalnost:** Pregled prihodnjih in neplačanih računov

**Uporabniška vloga:** `USER`

### Sprejemni kriteriji 

1. Sistem prikaže račune trenutno prijavljenega uporabnika, ki še niso plačani.
2. Pri vsakem računu sistem prikaže vsaj izdajatelja, znesek, datum zapadlosti in status plačila.
3. Uporabnik lahko prepozna račune, katerih datum zapadlosti je v prihodnosti, in račune, katerih rok je že potekel.
4. Plačani računi niso prikazani kot neplačane obveznosti.
5. Uporabnik ne more pregledovati računov drugih uporabnikov.

---

## 5.17 US-15: Administracija uporabnikov in privzetih kategorij

**Uporabniška zgodba:**

Kot administrator želim upravljati uporabniške račune in privzete kategorije, da lahko skrbim za pravilno delovanje in organizacijo aplikacije.

**Povezana funkcionalnost:** Administracija uporabnikov in kategorij

**Uporabniška vloga:** `ADMIN`

### Sprejemni kriteriji 

1. Administrator lahko pregleda seznam uporabniških računov in njihove osnovne podatke.
2. Administrator lahko deaktivira uporabniški račun do katerega uporabnik nima dostopa do ponovne aktivacije računa. Uporabnik se ne more več prijaviti v aplikacijo.
3. Administrator lahko upravlja privzete sistemske kategorije stroškov. Lahko jih dodaja, ureja ali briše.
4. Uporabnik brez administratorske vloge ne more dostopati do administrativnih funkcionalnosti.
5. Administratorske funkcionalnosti ne omogočajo samodejnega dostopa do podrobnih osebnih finančnih podatkov v