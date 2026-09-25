export function responsiveImage(src: string) {
  const base = src.match(/^\/optimized\/(.+)-1600\.webp$/)?.[1]
  if (base) return { src, srcSet: [480, 960, 1600].map((width) => `/optimized/${base}-${width}.webp ${width}w`).join(', ') }
  if (/^https:\/\/[^/]*graphassets\.(com|dev)\//.test(src)) {
    const url = new URL(src)
    const parts = url.pathname.split('/')
    const handle = parts.pop()
    if (handle) return { src, srcSet: [480, 960, 1600].map((width) => `${url.origin}${[...parts, `resize=width:${width}`, handle].join('/')} ${width}w`).join(', ') }
  }
  return { src }
}
