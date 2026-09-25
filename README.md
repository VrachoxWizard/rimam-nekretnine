# RIMAM nekretnine

Statička Next.js stranica s uredničkim CMS-om koji ne zahtijeva pristup GitHubu.

## Lokalni pregled i Vercel Preview

```bash
npm install
npm run dev
```

Lokalno se prikazuju tri **jasno označena demonstracijska oglasa**. Vercel Preview ih prikazuje automatski (`VERCEL_ENV=preview`), kako bi klijentica vidjela cjelovito web iskustvo. Za prikaz klijentici koristite granu `preview` u Vercelu i njezin Preview URL. Vercelova glavna grana je produkcija: `npm run build` bez CMS podataka stvara je **bez demonstracijskih oglasa**. Za ručnu demonstracijsku izgradnju postavite `SHOW_DEMO_LISTINGS=true`. Preview stranice nose `noindex`.

## CMS i objavljivanje

Koristi se [Hygraph Hobby](https://hygraph.com/pricing), s posebnim korisničkim računom klijentice. Njoj nije potreban GitHub. Stranica tijekom izgradnje čita samo objavljene nekretnine iz Hygrapha. Fotografije se poslužuju u prikladnim veličinama. Koraci i model: [CMS-SETUP.md](CMS-SETUP.md).

Za Cloudflare Pages: build `npm run build`, output `out`. Vercel može prikazivati Preview uz `output: export`; automatski obrazac je Cloudflare Pages Function i radi nakon povezivanja Cloudflare računa. Za Vercel Preview bez backend računa sučelje nudi izravan telefon i e-poštu. DNS `rimam.hr` u ovoj fazi ostaje netaknut.

## Obrazac

`POST /api/upit` (Cloudflare Pages Function) provjerava unos, Turnstile token i šalje poruku putem Resenda. Statičke rute ne pozivaju funkciju (`public/_routes.json`). Dok konfiguracija nije dovršena, obrazac nije aktivan i ne prikazuje lažnu potvrdu. Potrebne varijable nalaze se u `.env.example`; tajni ključevi pripadaju samo serveru. Sadašnja javna adresa prima upite. Prije aktivacije potvrditi tekst privatnosti s klijenticom i testirati stvarno slanje.

## Struktura

- `src/app`: stranice, SEO, stilovi
- `src/components`: galerija, kartice, filtri, kontakt
- `functions/api/upit.ts`: server-side obrada upita na Cloudflare Pages
- `content/nekretnine`: lokalni demonstracijski oglasi
- `scripts/optimize-images.mjs`: 480/960/1600 px WebP varijante lokalnih fotografija
- `BRAND-AND-RESEARCH.md`: dizajn i istraživanje
- `IMAGE-SOURCES.md`: podrijetlo ilustrativnih fotografija
