'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Gallery({ images, alt }: { images: string[], alt: string }) {
  const [active, setActive] = useState(0)
  return <div className="gallery">
    <div className="gallery-main"><Image src={images[active]} alt={`${alt}, fotografija ${active + 1} od ${images.length}`} width={1600} height={1050} priority sizes="(max-width: 800px) 100vw, 80vw" />{images.length > 1 && <div className="gallery-controls"><button type="button" aria-label="Prethodna fotografija" onClick={() => setActive((active - 1 + images.length) % images.length)}>←</button><span>{active + 1} / {images.length}</span><button type="button" aria-label="Sljedeća fotografija" onClick={() => setActive((active + 1) % images.length)}>→</button></div>}</div>
    {images.length > 1 && <div className="gallery-thumbs">{images.map((src, i) => <button key={`${src}-${i}`} type="button" className={i === active ? 'selected' : ''} onClick={() => setActive(i)} aria-label={`Prikaži fotografiju ${i + 1}`} aria-pressed={i === active}><Image src={src} alt="" width={220} height={150} sizes="120px" /></button>)}</div>}
  </div>
}
