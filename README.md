# RIMAM nekretnine

Nova statička stranica RIMAM d.o.o. s besplatnim sustavom za uređivanje oglasa.

## Lokalni rad

```bash
npm install
npm run dev
```

Otvorite `http://localhost:3000`. Provjera produkcijske verzije: `npm run build`. Izgrađena stranica nalazi se u `out/`.

## Besplatno objavljivanje

1. Povežite ovaj GitHub repozitorij s [Cloudflare Pages](https://pages.cloudflare.com/).
2. Build command: `npm run build`. Output directory: `out`.
3. Dodajte domenu `rimam.hr` tek kada ste spremni zamijeniti postojeću stranicu.
4. U postavkama builda postavite `NEXT_PUBLIC_SITE_URL=https://rimam.hr`.

Cloudflare Pages Free ima kvote. Trenutno navodi do 500 buildova mjesečno; provjerite aktualne uvjete prije objave. Postojeća domena/registracija može imati zaseban trošak.

## Uređivanje nekretnina

1. Otvorite [Pages CMS](https://app.pagescms.org/) i prijavite se putem GitHuba.
2. Dodajte ovaj repozitorij u Pages CMS. Konfiguracija polja već je spremljena u `.pages.yml`.
3. U odjeljku **Nekretnine** odaberite **New**. Upišite naslov, cijenu, površinu, lokaciju i opis. Dodajte naslovnu fotografiju i galeriju.
4. Uključite **Objavljeno na stranici** pa spremite. GitHub promjena automatski pokreće novu Cloudflare Pages izgradnju.
5. Za privremeno skrivanje oglasa isključite **Objavljeno na stranici** i spremite.

Za vlasnicu je najbolje otvoriti samo Pages CMS, bez uređivanja koda. Fotografije se pri izgradnji automatski pretvaraju u manji WebP prikaz. Izvorne datoteke ostaju u repozitoriju. Prije slanja fotografija preporučuje se izbjegavati vrlo velike originalne datoteke.

Tri postojeća oglasa demonstracijski su primjeri, označeni u podacima i na stranici. Obrišite ih u Pages CMS-u prije stvarne javne objave. Ilustrativne fotografije generirane su za ovaj projekt; nisu fotografije stvarnih nekretnina.

## Kontakt i privatnost

Kontakt obrazac otvara korisnikov program za e-poštu i ne šalje poruku automatski. Za slanje bez e-poštanskog programa potreban je dodatni servis ili server. Stranica ne koristi analitičke kolačiće. Tekst stranice privatnosti treba potvrditi s klijenticom prije javne objave.

## Sadržaj

- `content/nekretnine/*.json`: oglasi
- `.pages.yml`: sučelje za uređivanje
- `public/uploads`: fotografije iz CMS-a
- `src/app`: stranice, SEO i stilovi
- `BRAND-AND-RESEARCH.md`: dizajnerske odluke i pregled starog stanja
