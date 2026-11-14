import { site } from '../../data/site';
import type { OptimizedImage } from '../../lib/images';
import Backdrop from '../ui/Backdrop';
import styles from './Hero.module.css';

interface Props {
	image?: OptimizedImage;
}

export default function Hero({ image }: Props) {
	return (
		<section className={`${image ? '' : 'bg-photo-placeholder'} ${styles.hero}`}>
			{/* The hotel sits on the left of the photo, so keep that edge in view on narrow screens. */}
			{image && <Backdrop image={image} position="left center" />}
			<h1 className={`display ${styles.names}`} data-reveal>
				<span className={styles.line}>{site.couple.first}</span>
				<span className={`script ${styles.line} ${styles.and}`}>and</span>
				<span className={styles.line}>{site.couple.second}</span>
			</h1>
			<p className={`display ${styles.tagline}`} data-reveal>
				Are getting married!
			</p>
		</section>
	);
}
