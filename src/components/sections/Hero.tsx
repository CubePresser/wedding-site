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
			{image && <Backdrop image={image} />}
			<h1 className={`display ${styles.names}`}>
				<span className={styles.line}>{site.couple.first}</span>
				<span className={`script ${styles.line} ${styles.and}`}>and</span>
				<span className={styles.line}>{site.couple.second}</span>
			</h1>
			<p className={`display ${styles.tagline}`}>Are getting married!</p>
		</section>
	);
}
