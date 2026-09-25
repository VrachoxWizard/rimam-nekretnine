'use client'

import { useEffect, useRef, useState } from 'react'
import { ResponsiveImage } from './ResponsiveImage'

export function Gallery({ images, alt }: { images: string[], alt: string }) {
  const [active, setActive] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const move = (step: number) => setActive((current) => (current + step + images.length) % images.length)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!dialog.current?.open) return
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length])
  const open = () => dialog.current?.showModal()
  const close = () => dialog.current?.close()
  return <div className="gallery">
    <div className="gallery-main"><ResponsiveImage src={images[active]} alt={`${alt}, fotografija ${active + 1} od ${images.length}`} width={1600} height={1050} loading="eager" fetchPriority="high" sizes="(max-width: 800px) 100vw, 90vw" /><button ref={opener} className="gallery-expand" type="button" onClick={open}>Sve fotografije <span aria-hidden="true">↗</span></button>{images.length > 1 && <div className="gallery-controls"><button type="button" aria-label="Prethodna fotografija" onClick={() => move(-1)}>←</button><span>{active + 1} / {images.length}</span><button type="button" aria-label="Sljedeća fotografija" onClick={() => move(1)}>→</button></div>}</div>
    {images.length > 1 && <div className="gallery-thumbs">{images.map((src, i) => <button key={`${src}-${i}`} type="button" className={i === active ? 'selected' : ''} onClick={() => setActive(i)} aria-label={`Prikaži fotografiju ${i + 1}`} aria-pressed={i === active}><ResponsiveImage src={src} alt="" width={220} height={150} loading="lazy" sizes="130px" /></button>)}</div>}
    <dialog ref={dialog} className="gallery-dialog" aria-label={`Fotografije: ${alt}`} onClose={() => opener.current?.focus()} onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null }} onTouchEnd={(e) => { if (touchX.current === null) return; const distance = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); touchX.current = null }}>
      <div className="gallery-dialog-bar"><span>{active + 1} / {images.length}</span><button type="button" onClick={close} aria-label="Zatvori galeriju">Zatvori ×</button></div>
      <div className="gallery-dialog-image"><ResponsiveImage src={images[active]} alt={`${alt}, fotografija ${active + 1} od ${images.length}`} width={1600} height={1050} sizes="100vw" /></div>
      {images.length > 1 && <div className="gallery-dialog-nav"><button type="button" onClick={() => move(-1)} aria-label="Prethodna fotografija">←</button><button type="button" onClick={() => move(1)} aria-label="Sljedeća fotografija">→</button></div>}
    </dialog>
  </div>
}
