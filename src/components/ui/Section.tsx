import type { ReactNode } from 'react';
import type { OptimizedImage } from '../../lib/images';
import styles from './Section.module.css';

interface Props {
	/** Anchor target for in-page nav links. */
	id?: string;
	tone?: 'cream' | 'stripes' | 'photo';
	/** Background for tone="photo". Falls back to a placeholder gradient. */
	image?: OptimizedImage;
	children: ReactNode;
}

export default function Section({ id, tone = 'cream', image, children }: Props) {
	const classes = [
		styles.section,
		tone !== 'cream' && styles.onDark,
		tone === 'stripes' && 'bg-stripes-olive',
		tone === 'photo' && !image && 'bg-photo-placeholder',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<section id={id} className={classes}>
			{tone === 'photo' && image && (
				<img
					className={styles.backdrop}
					src={image.src}
					srcSet={image.srcSet}
					sizes="100vw"
					width={image.width}
					height={image.height}
					alt=""
				/>
			)}
			<div className={`container ${styles.content}`}>{children}</div>
		</section>
	);
}
