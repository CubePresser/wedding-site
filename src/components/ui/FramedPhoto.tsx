import type { Photo } from '../../lib/images';
import styles from './FramedPhoto.module.css';

interface Props extends Photo {
	variant?: 'double' | 'polaroid';
}

export default function FramedPhoto({ image, alt, variant = 'polaroid' }: Props) {
	return (
		<figure className={`${styles.frame} ${styles[variant]}`}>
			<img
				className={styles.photo}
				src={image.src}
				srcSet={image.srcSet}
				width={image.width}
				height={image.height}
				alt={alt}
				loading="lazy"
				decoding="async"
			/>
		</figure>
	);
}
