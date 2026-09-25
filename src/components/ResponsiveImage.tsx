import { responsiveImage } from '@/lib/images'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string, alt: string }

export function ResponsiveImage({ src, alt, ...props }: Props) {
  return <img {...responsiveImage(src)} alt={alt} decoding="async" {...props} />
}
