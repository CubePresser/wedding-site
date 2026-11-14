import { site } from '../../data/site';
import styles from './Hero.module.css';

// TODO: swap the placeholder for the venue aerial using Section's image handling
export default function Hero() {
	return (
		<section className={`bg-photo-placeholder ${styles.hero}`}>
			<h1 className={`display ${styles.names}`}>
				<span className={styles.line}>{site.couple.first}</span>
				<span className={`script ${styles.line} ${styles.and}`}>and</span>
				<span className={styles.line}>{site.couple.second}</span>
			</h1>
			<p className={`display ${styles.tagline}`}>Are getting married!</p>
		</section>
	);
}
