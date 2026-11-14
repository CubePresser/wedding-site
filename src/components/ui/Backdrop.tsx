import type { OptimizedImage } from '../../lib/images';
import styles from './Backdrop.module.css';

interface Props {
	image: OptimizedImage;
	/** CSS object-position: which part of the photo stays in view when it's cropped. */
	position?: string;
}

// Full-bleed photo behind a section's content, muted so cream text stays readable.
// The parent must be position: relative, and its content needs position: relative to sit on top.
export default function Backdrop({ image, position = 'center' }: Props) {
	return (
		<div className={styles.backdrop}>
			<img
				className={styles.image}
				style={{ objectPosition: position }}
				src={image.src}
				srcSet={image.srcSet}
				// object-fit: cover crops tall sections on phones, so ask for more than the viewport width.
				sizes="max(100vw, 1280px)"
				width={image.width}
				height={image.height}
				alt=""
			/>
		</div>
	);
}
