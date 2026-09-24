import Link from 'next/link'
export default function NotFound() { return <main id="sadrzaj" className="container page-shell not-found"><p className="eyebrow">404</p><h1>Ovdje nema<br /><em>traženog prostora.</em></h1><p>Stranica je možda premještena ili više nije dostupna.</p><Link className="button button-dark" href="/">Povratak na početnu <span>↗</span></Link></main> }
