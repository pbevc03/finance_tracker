# 2. Funkcionalnosti in obseg

## 2.1 Uporabniške vloge

### Osebni uporabnik (USER)

Osebni uporabnik je glavna uporabniška vloga aplikacije. Namenjena je posamezniku, ki želi spremljati svoje osebne finance.

Uporabnik lahko:
- dodaja, ureja in odstranjuje svoje prihodke, stroške in račune,
- razvršča svoje prihodke in stroške po kategorijah,
- ustvarja splošne in kategorijske proračune,
- določa obdobje veljavnosti posameznega proračuna,
- spremlja trenutno porabo glede na nastavljene proračune,
- pregleduje neplačane račune,
- pregleduje zgodovino finančnih transakcij,
- pregleduje statistiko in grafe svoje porabe,
- prejema opozorila glede približevanja ali preseganja proračunov.

Uporabnik nima dostopa do finančnih podatkov drugih uporabnikov in ne more spreminjati njihovih podatkov.

### Administrator (ADMIN)

Administrator je odgovoren za upravljanje uporabniških računov in osnovno administracijo aplikacije.

Administrator lahko:

- pregleduje in upravlja uporabniške račune,
- deaktivira uporabniške račune v skladu s pravili aplikacije,
- upravlja privzete kategorije stroškov,
- obravnava prijave zlorab in neprimerne uporabe aplikacije,
- pomaga pri odpravljanju težav, povezanih z uporabo aplikacije.

Administrator ne potrebuje samodejnega dostopa do podrobnih osebnih finančnih podatkov uporabnikov. Ti podatki morajo biti ustrezno zaščiteni.

### Upravljavec skupnega proračuna (BUDGET_MANAGER)

Upravljavec skupnega proračuna je uporabnik, ki lahko poleg spremljanja svojih osebnih financ upravlja tudi skupni proračun, na primer za družino ali gospodinjstvo.

Njegove predvidene naloge vključujejo:

- ustvarjanje skupnega proračuna,
- določanje višine skupnega proračuna,
- dodajanje članov v skupni proračun,
- spremljanje skupnih stroškov,
- pregled skupne porabe in preostalega razpoložljivega zneska.

Upravljavec skupnega proračuna lahko dostopa samo do podatkov, za katere ima ustrezna dovoljenja. Upravljanje skupnih proračunov je predvideno kot kasnejša nadgradnja in ni del prve delujoče različice (MVP).

---

## 2.2 Predvidene funkcionalnosti

Aplikacija bo predvidoma vsebovala naslednje funkcionalnosti:

1. **[MVP] Beleženje prihodkov in stroškov**

   Uporabnik lahko vnese prihodek ali strošek ter določi znesek, datum, kategorijo in opis. Vnesene podatke lahko pozneje pregleda, popravi ali odstrani.

2. **[MVP] Upravljanje računov**

   Uporabnik lahko vnese račun ter določi znesek, izdajatelja, datum izdaje, datum zapadlosti in status plačila. Račune lahko pregleduje in spremlja njihove obveznosti.

   Račun predstavlja finančno obveznost, transakcija pa dejanski prihodek ali odhodek. Ko uporabnik račun označi kot plačan, aplikacija ustvari povezano odhodno transakcijo, ki se upošteva pri izračunu porabe. Isti račun ne sme povzročiti večkratnega evidentiranja istega plačila.

3. **[MVP] Prepoznavanje podatkov iz fotografije računa**

   Uporabnik lahko fotografira račun oziroma naloži njegovo sliko. Sistem poskuša iz slike prepoznati pomembne podatke, kot so znesek, datum, izdajatelj in kategorija.

   Pred shranjevanjem lahko uporabnik prepoznane podatke pregleda, popravi in potrdi.

4. **[MVP] Nastavitev proračuna**

   Uporabnik lahko določi najvišji znesek, ki ga želi porabiti v izbranem obdobju. Proračun je lahko splošen ali vezan na posamezno kategorijo stroškov.

   Pri ustvarjanju proračuna uporabnik določi znesek, kategorijo, če gre za kategorijski proračun, ter začetni in končni datum obdobja. Proračun lahko velja za en mesec, več mesecev ali celo leto.

   Pri splošnem proračunu se upoštevajo vsi odhodki uporabnika, pri kategorijskem pa samo odhodki iz izbrane kategorije.

5. **[MVP] Spremljanje porabe glede na proračun**

   Aplikacija na podlagi evidentiranih stroškov izračuna trenutno porabo znotraj obdobja posameznega proračuna in jo primerja z nastavljenim zneskom.

   Uporabnik lahko spremlja skupno porabo, porabo po kategorijah, porabljeni znesek in preostali razpoložljivi znesek za vsak proračun.

   Pri izračunu se upoštevajo samo odhodki, ki spadajo v obdobje veljavnosti proračuna in ustrezajo njegovi vrsti. Pri splošnem proračunu se upoštevajo vsi odhodki, pri kategorijskem pa samo odhodki iz izbrane kategorije.

6. **[MVP] Analiza porabe po kategorijah**

   Uporabnik lahko spremlja, za katere kategorije porabi največ denarja. Kategorije lahko vključujejo hrano, stanovanje, prevoz, zabavo, naročnine, zdravje in druge stroške.

   Podatki so predstavljeni tudi z grafi, ki omogočajo lažjo primerjavo porabe med kategorijami.

7. **[MVP] Opozorila ob približevanju ali preseganju proračuna**

   Sistem uporabnika opozori, ko poraba doseže določen delež proračuna ali ko nastavljeni znesek preseže.

   Opozorila se izračunavajo ločeno za vsak proračun glede na njegovo določeno obdobje in omejitev. Uporabnik lahko tako prejme opozorilo za splošni proračun ali za posamezno kategorijo stroškov.

   Prag za opozorilo mora biti določen v implementaciji aplikacije. Opozorila uporabniku pomagajo pravočasno prepoznati previsoko porabo.

8. **Pregled zgodovine finančnih transakcij**

   Uporabnik lahko pregleduje pretekle prihodke in stroške ter jih filtrira glede na obdobje, kategorijo ali vrsto transakcije.

   Plačani računi so povezani z ustreznimi odhodnimi transakcijami, zato se lahko njihova plačila upoštevajo v finančni statistiki.

9. **Pregled prihodnjih in neplačanih računov**

   Uporabnik lahko pregleda račune, ki še niso bili plačani, in preveri njihove zneske ter datume zapadlosti.

   Tako lahko pravočasno prepozna prihajajoče finančne obveznosti.

10. **Primerjava mesečne porabe**

    Uporabnik lahko primerja svojo porabo med različnimi meseci in spremlja spremembe v skupnih stroških ter porabi po posameznih kategorijah.

11. **Upravljanje ponavljajočih se stroškov**

    Uporabnik lahko določi stroške, ki se ponavljajo v določenih časovnih intervalih, na primer naročnine ali mesečne položnice.

    Aplikacija lahko na podlagi teh nastavitev pomaga pri spremljanju prihodnjih obveznosti.

12. **Upravljanje skupnih proračunov**

    Uporabnik lahko ustvari skupni proračun za družino ali gospodinjstvo, vanj povabi druge člane in spremlja skupne stroške.

    Upravljavec skupnega proračuna lahko določa višino proračuna in spremlja njegovo porabo. Ta funkcionalnost je predvidena kot kasnejša nadgradnja in ni del MVP.

13. **Upravljanje finančnih ciljev**

    Uporabnik lahko določi finančni cilj, na primer prihraniti 2.000 €, ter spremlja svoj napredek proti zastavljenemu znesku.

    Funkcionalnost omogoča spremljanje napredka pri varčevanju in načrtovanju večjih izdatkov.

14. **Administracija uporabnikov in kategorij**

    Administrator lahko upravlja uporabniške račune, deaktivira račune v skladu s pravili aplikacije, upravlja privzete kategorije stroškov ter obravnava prijave zlorab in težave pri uporabi aplikacije.

    Administrator nima samodejnega dostopa do podrobnih finančnih podatkov vseh uporabnikov.

---

## 2.3 Funkcionalnosti prve delujoče različice (MVP)

Prva delujoča različica aplikacije bo vsebovala naslednje ključne funkcionalnosti:

1. Beleženje prihodkov in stroškov.
2. Upravljanje računov.
3. Prepoznavanje podatkov iz fotografije računa.
4. Nastavitev splošnih in kategorijskih proračunov za izbrano obdobje.
5. Spremljanje porabe glede na nastavljene proračune.
6. Analiza porabe po kategorijah.
7. Opozorila glede približevanja ali preseganja proračunov.

MVP vključuje osnovno beleženje in pregled finančnih podatkov ter funkcionalnosti za upravljanje osebnega proračuna, analizo porabe in opozarjanje na previsoko porabo.

Uporabnik lahko določi proračun za celotno porabo ali za posamezno kategorijo stroškov. Obdobje proračuna lahko zajema en mesec, več mesecev ali celotno leto.

Prepoznavanje podatkov iz fotografije računa omogoča hitrejši vnos podatkov, pri čemer mora uporabnik prepoznane podatke pred shranjevanjem potrditi ali popraviti.

Upravljanje skupnih proračunov, finančnih ciljev in ponavljajočih se stroškov ni del prve delujoče različice, temveč je predvideno kot možnost za nadaljnji razvoj aplikacije.

---

## 2.4 Kasnejše nadgradnje

V prihodnosti bi bilo mogoče aplikacijo razširiti z naslednjimi funkcionalnostmi:

- naprednejša analiza osebne porabe s pomočjo umetne inteligence,
- samodejno predlaganje mesečnega proračuna na podlagi pretekle porabe,
- napovedovanje prihodnjih stroškov,
- upravljanje finančnih ciljev in varčevanja,
- podpora skupnim oziroma družinskim proračunom,
- upravljanje članov in pravic znotraj skupnih proračunov,
- pošiljanje obvestil po elektronski pošti,
- izvoz finančnih poročil v PDF ali CSV,
- razvoj mobilne aplikacije,
- podpora več valutam.

Nadgradnje bodo omogočale razširitev osnovnih funkcionalnosti ter prilagoditev aplikacije zahtevnejšim potrebam uporabnikov.

---

## 2.5 Out of scope

V okviru tega projekta naslednje funkcionalnosti ne bodo implementirane:

- neposredno plačevanje računov prek aplikacije,
- izvajanje finančnih transakcij v imenu uporabnika,
- neposredna povezava z bančnimi računi,
- trgovanje z delnicami, kriptovalutami ali drugimi finančnimi instrumenti,
- zagotavljanje profesionalnega finančnega ali investicijskega svetovanja,
- samodejno oddajanje davčnih obrazcev,
- upravljanje kreditov in posojil.

Te funkcionalnosti lahko predstavljajo možnosti za nadaljnji razvoj aplikacije, vendar niso del začetnega obsega projekta.