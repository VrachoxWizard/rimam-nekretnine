# RIMAM: istraživanje i digitalni identitet

## Postojeća stranica

Pregledana je javna stranica `rimam.hr` 25. rujna 2026. Trenutno je riječ o jednostavnoj informativnoj stranici, bez javnog kataloga nekretnina. Sadrži naziv RIMAM d.o.o., Zagreb, osnivanje 1993., adresu Trnsko 1b, OIB 98938344438, telefon 098 250 447 i adresu e-pošte robert.ruzic67@gmail.com. Ovi su podaci preuzeti; stvarne nekretnine nisu bile dostupne za migraciju.

Vizualno su problem generička ljubičasta akcentna boja, sustav fontova bez karaktera, kratka hero sekcija i ilustrativne AI fotografije bez jasne povezanosti s ponudom. Navigacija vodi samo na sidra iste stranice. Nema preglednika oglasa, galerija, filtriranja ni puta od pojedine nekretnine do upita. Postoje osnovni naslov, opis, canonical i Open Graph oznake, ali nema bogatog sadržaja za lokalne upite o nekretninama. Stara stranica ima mobilni raspored, no nedostaju mobilni tokovi za traženje i kontaktiranje povodom oglasa.

## Uzori i izdvojeni obrasci

- [Croatia Sotheby's International Realty](https://sothebysrealty.hr/hr/): snažna fotografija, namjenska pretraga i jasno imenovane kategorije ponude.
- [Knight Frank](https://www.knightfrank.co.uk/): editorial ritam, povjerenje kroz stručni sadržaj i prostorne fotografije.
- [Broker Real Estate](https://broker.hr/en): hrvatski kontekst i jasno izražena usluga posredovanja.
- [Pages CMS](https://pagescms.org/): besplatno uređivanje sadržaja i fotografija preko GitHuba.
- [Cloudflare Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/): statičko objavljivanje uz besplatne kvote.

RIMAM koristi fotografiju kao glavni vizualni dokaz, mirnu navigaciju, kratke tekstove i filtriranje sa šest bitnih kriterija. Inspiracija je spojena u vlastiti sustav bez kopiranja pojedine stranice.

## Identitet

Stari logo ima crveno polje, tanki RIMAM natpis i naglašene vrhove slova M. Novi znak zadržava ritam tih vrhova kao geometrijski potez; uklanja doslovnu siluetu krova i pojednostavljuje primjenu u malim veličinama. Wordmark je razmaknut i miran. Favicon koristi samo znak.

- Primarna podloga: `#F5F3EF` (svijetli papir)
- Tekst: `#1C2622` (tamni grafit sa zelenim tonom)
- Akcent: `#A5463B` (prigušena crvena, veza sa starim identitetom)
- Sekundarna podloga: `#EBE7E1`
- Naslovi: Cormorant Garamond; sučelje i tekst: DM Sans

Znak se koristi u jednoj akcentnoj boji na svijetloj podlozi. Na tamnoj podlozi riječ ostaje svijetla, znak prelazi u nešto svjetliju crvenu. Fotografije se ne prekrivaju oznakama osim nužnih kontrola galerije.

## CMS odluka

Custom admin tražio bi održavanje prijave, pohrane slika, baze i sigurnosnih zakrpa. Pages CMS je besplatan i već sadrži urednik, prijavu kroz GitHub te upload više fotografija. Oglasi su JSON datoteke, objava je Git commit, a Cloudflare Pages automatski izgradi javnu stranicu. Nema stalnog servera ni baze. Ograničenje je odgoda od nekoliko minuta između spremanja i objave te GitHub račun/repozitorij kao pozadina sustava.

Prije prelaska na stvarnu domenu treba povezati GitHub, Pages CMS i Cloudflare Pages, zamijeniti demonstracijske oglase stvarnima te potvrditi pravni i kontakt sadržaj.
