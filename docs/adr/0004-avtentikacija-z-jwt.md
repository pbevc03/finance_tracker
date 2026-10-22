# Avtentikacija uporabnikov z JWT

## Kontekst in opis problema
Aplikacija bo shranjevala osebne finančne podatke, zato mora biti dostop do zaščitenih funkcionalnosti omogočen samo ustrezno avtenticiranim uporabnikom. Backend mora preverjati identiteto uporabnika pri zahtevah prek REST API-ja. Odločiti se moramo, kako bomo izvajali avtentikacijo in kako bo uporabnik dokazoval svojo identiteto pri komunikaciji z backendom.

## Obravnavane možnosti
- Uporaba žetonov JWT skupaj s Spring Security.
- Uporaba sej na strežniški strani.

## Odločitev in utemeljitev
Izbrana možnost: **»JWT skupaj s Spring Security«**, ker omogoča preverjanje identitete uporabnika prek žetona, ki ga odjemalec pošilja pri zahtevah do zaščitenih končnih točk. Spring Security bo uporabljena za zaščito končnih točk in preverjanje pristopa do funkcionalnosti aplikacije.

## Posledice
- Dobro, ker lahko backend preverja veljavnost žetonov pri zahtevah do zaščitenih končnih točk.
- Dobro, ker Spring Security omogoča centralizirano upravljanje varnostnih pravil.
- Dobro, ker lahko sistem razširimo s preverjanjem uporabniških vlog in pravic.
- Slabo, ker moramo ustrezno poskrbeti za varno shranjevanje žetonov, njihovo veljavnost in obravnavo poteka veljavnosti.
- Slabo, ker veljaven JWT sam po sebi ne zagotavlja, da ima uporabnik pravico dostopati do posameznega finančnega zapisa. Backend mora pri vsaki ustrezni operaciji preveriti tudi lastništvo podatkov.
- Slabo, ker moramo zaščititi komunikacijo s HTTPS in varno upravljati skrivne ključe.