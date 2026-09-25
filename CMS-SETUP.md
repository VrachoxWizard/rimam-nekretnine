# CMS bez pristupa GitHubu

**Odabir:** Hygraph Hobby. Klijentica dobiva vlastitu prijavu u Hygraph, a GitHub repozitorij ostaje dostupan samo vlasniku. Oglasi se uređuju i fotografije prenose u Hygraph. Ova faza priprema kod; projekt, račun i stvarni oglasi još nisu povezani.

## Model `Nekretnina`

U Hygraphu izraditi jedan model `Nekretnina` s API ID `Nekretnina`. Dodati polja ovim redom (API ID mora odgovarati tablici):

| Prikaz u CMS-u | API ID | Tip | Obavezno |
| --- | --- | --- | --- |
| Naslov oglasa | `naslov` | Single line text | da |
| Oznaka oglasa | `slug` | Slug, unique, generiran iz naslova | da |
| Naslovna fotografija | `naslovna` | Asset, one | da |
| Ostale fotografije | `galerija` | Asset, multiple | ne |
| Ponuda | `namjena` | Enumeration `Namjena`, single | da |
| Vrsta nekretnine | `vrsta` | Enumeration `Vrsta`, single | da |
| Lokacija | `lokacija` | Single line text | da |
| Cijena u eurima | `cijena` | Integer | da |
| Površina u m² | `povrsina` | Integer | da |
| Broj soba | `sobe` | Integer | ne |
| Opis | `opis` | Multi line text | da |
| Karakteristike | `karakteristike` | Single line text, list | ne |
| Adresa, ako smije biti javna | `adresa` | Single line text | ne |
| Kontakt osoba | `kontaktIme` | Single line text | ne |
| Kontakt telefon | `kontaktTelefon` | Single line text | ne |
| Kontakt e-pošta | `kontaktEmail` | Single line text | ne |

Izbornik `Namjena`: API vrijednosti `prodaja`, `najam`; oznake Prodaja, Najam. Izbornik `Vrsta`: API vrijednosti `stan`, `kuca`, `zemljiste`, `poslovni`; oznake Stan, Kuća, Zemljište, Poslovni prostor. Naslovna fotografija može biti i u galeriji, ali tada će se prikazati dvaput; u galeriju dodavati samo ostale fotografije.

Hygraph novi unos prvo sprema kao **Draft**. Klijentica ga objavljuje kroz **Save & Publish**, a skriva kroz **Unpublish**. Na stranici se čitaju samo objavljeni unosi. To uklanja mogućnost slučajne objave novog oglasa prije dovršetka.

## Povezivanje

1. Vlasnik projekta otvara Hygraph Hobby projekt. Poziva klijenticu na njezinu e-poštu kao urednicu sadržaja. Ne dijeli GitHub račun ni repozitorij.
2. Stvori model i polja iz tablice. U Content API pristupu dopusti čitanje objavljenih unosa i fotografija ili izradi read-only token. URL Content API-ja upiši u `HYGRAPH_ENDPOINT`; token, ako ga koristiš, u `HYGRAPH_TOKEN`.
3. Postavi te varijable **samo u produkcijsko okruženje** hostinga. Vercel Preview bez njih prikazuje označene demonstracijske oglase. Produkcija bez njih ne prikazuje demonstracijske oglase.
4. U hostingu stvori Deploy Hook za produkcijsku granu. U Hygraph Automation → Webhooks dodaj taj URL za model `Nekretnina`, događaje **Publish**, **Unpublish** i izmjene objavljenog sadržaja. Webhook pokreće novu statičku izgradnju. URL hooka tretiraj kao tajnu.
5. U CMS-u unesi prvi stvarni oglas, prenesi fotografije, provjeri nacrt, objavi i provjeri novu izgradnju. Tek tada preusmjeri domenu.

Statika se ažurira nakon nove izgradnje, ne odmah po kliku na Publish. Ako CMS API vrati grešku, izgradnja pada umjesto da objavi nepotpune podatke. Hygraph fotografije isporučuju se u više širina pomoću njihovih transformacija; lokalne demonstracijske fotografije optimiziraju se pri izgradnji.

Provjeriti aktualne granice besplatnog plana i mogućnost webhooks prije povezivanja računa. Aktualno Hygraph Hobby navodi 3 korisnička mjesta, 1.000 unosa i 5 webhooks: https://hygraph.com/pricing i https://hygraph.com/docs/getting-started/update-billing.
