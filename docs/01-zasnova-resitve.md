# 1. Zasnova rešitve

## 1.1 Ime rešitve

**Personal Finance & Bill Tracker**

## 1.2 Namen rešitve in problem

Personal Finance & Bill Tracker je spletna aplikacija za spremljanje osebnih financ, s katero lahko uporabnik na enem mestu beleži svoje prihodke, stroške in račune ter spremlja svojo finančno porabo.

Problem, ki ga rešitev naslavlja, je predvsem pomanjkanje pregleda nad tem, kam uporabnik porablja svoj denar. Stroški so pogosto razpršeni med bančne izpiske, položnice, račune in različne zapiske, zato je težko ugotoviti, koliko denarja je bilo v določenem obdobju porabljenega, za katere kategorije in ali uporabnik presega svoj načrtovani mesečni proračun.

Aplikacija uporabniku omogoča centraliziran pregled nad financami. Na podlagi vnesenih podatkov lahko izračuna skupno porabo, porabo po kategorijah in primerja dejansko porabo z nastavljenim mesečnim proračunom. Podatki se lahko prikažejo tudi v obliki grafov in drugih statističnih pregledov.

Cilj rešitve je uporabniku pomagati pri boljšem spremljanju osebnih financ in ga pravočasno opozoriti na previsoko porabo oziroma prihajajoče finančne obveznosti.

## 1.3 Ciljni uporabniki

### Osebni uporabnik

Osebni uporabnik je glavni uporabnik aplikacije. Njegov namen je spremljanje osebnih financ, vključno s prihodki, stroški, računi in mesečnim proračunom.

Uporabnik lahko dodaja in ureja svoje finančne transakcije, upravlja račune, razvršča stroške po kategorijah ter spremlja finančno statistiko. Prav tako lahko določi mesečni proračun in preverja, ali njegova poraba presega načrtovane vrednosti.

Uporabnik ima dostop samo do svojih osebnih finančnih podatkov in do skupnih proračunov, pri katerih sodeluje, v skladu s svojimi pravicami.

**Primer uporabe:**

> Uporabnik želi preveriti, koliko je v tekočem mesecu porabil za hrano in stanovanje. V aplikaciji odpre finančni pregled, izbere ustrezno obdobje in si ogleda porabo po kategorijah ter primerjavo z mesečnim proračunom.

### Administrator

Administrator je odgovoren za upravljanje in osnovno vzdrževanje aplikacije. Njegova naloga je zagotavljanje pravilnega delovanja sistema ter obravnava težav, povezanih z uporabniškimi računi in neprimerno uporabo aplikacije.

Administrator lahko pregleduje in upravlja uporabniške račune, deaktivira račune v skladu s pravili aplikacije ter obravnava prijave neprimerne vsebine ali zlorab. Po potrebi lahko upravlja tudi sistemske nastavitve in privzete kategorije stroškov.

Administrator ne potrebuje samodejnega dostopa do podrobnih osebnih finančnih podatkov vseh uporabnikov, saj morajo biti ti podatki ustrezno zaščiteni.

**Primer uporabe:**

> Administrator prejme prijavo o neprimerni uporabi aplikacije. Preveri uporabniški račun, obravnava prijavo in po potrebi izvede ustrezen ukrep v skladu s pravili aplikacije.

### Upravljavec skupnega proračuna

Upravljavec skupnega proračuna je uporabnik, ki lahko poleg spremljanja svojih osebnih financ upravlja tudi skupni proračun, na primer za družino ali gospodinjstvo.

Njegove naloge vključujejo ustvarjanje skupnega proračuna, določanje njegove višine, dodajanje članov in spremljanje skupnih stroškov. Dostop do skupnih finančnih podatkov je omejen na člane in podatke, ki so del posameznega skupnega proračuna.

Ta vloga omogoča prihodnjo razširitev aplikacije s funkcionalnostmi za skupno upravljanje osebnih financ.

**Primer uporabe:**

> Uporabnik ustvari skupni mesečni proračun za gospodinjstvo v višini 1.500 €. V skupni proračun povabi druge člane gospodinjstva in spremlja skupne stroške za hrano, stanovanje ter druge obveznosti. Aplikacija prikazuje skupno porabo in preostali razpoložljivi znesek.


## 1.4 Kratek opis delovanja rešitve

Uporabnik se najprej prijavi v aplikacijo in dostopa do svojega finančnega pregleda. V aplikacijo lahko vnese svoje prihodke, stroške in račune. Pri vsakem strošku lahko določi znesek, datum, kategorijo, opis in po potrebi datum zapadlosti oziroma status plačila.

Uporabnik lahko za posamezen mesec določi tudi svoj proračun. Aplikacija nato na podlagi vnesenih finančnih podatkov izračuna trenutno porabo in jo primerja z določenim proračunom.

Stroški so razvrščeni po kategorijah, kot so na primer:

- Hrana
- Stanovanje
- Prevoz
- Zabava
- Naročnine
- Zdravje
- Ostalo

Na podlagi teh podatkov aplikacija pripravi statistične prikaze, s katerimi lahko uporabnik spremlja svojo porabo. Omogočen je tudi pregled prihodnjih oziroma še neplačanih računov.

Če se uporabnik približa nastavljenemu mesečnemu proračunu ali ga preseže, ga aplikacija na to opozori. Na ta način uporabnik ne spremlja samo pretekle porabe, ampak lahko na podlagi podatkov tudi pravočasno ukrepa.

Osnovni potek uporabe je

```text
Prijava uporabnika
       ↓
Pregled finančnega stanja
       ↓
Vnos prihodkov in stroškov
       ↓
Razvrščanje stroškov po kategorijah
       ↓
Nastavitev mesečnega proračuna
       ↓
Izračun porabe
       ↓
Primerjava porabe s proračunom
       ↓
Statistika in grafični prikazi
       ↓
Opozorila ob približevanju ali preseganju proračuna
```
