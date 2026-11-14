import { scheduleIntro } from '../../data/schedule';
import type { OptimizedImage } from '../../lib/images';
import Section from '../ui/Section';
import styles from './TheDay.module.css';

interface Props {
	items: { time: string; label: string; icon: OptimizedImage }[];
}

export default function TheDay({ items }: Props) {
	return (
		<Section id="schedule">
			<h2 className={`display ${styles.heading}`}>The Day</h2>
			<p className={`script ${styles.intro}`}>{scheduleIntro}</p>
			<ol className={styles.timeline}>
				{items.map((item) => (
					<li className={styles.item} key={item.label}>
						<img
							className={styles.icon}
							src={item.icon.src}
							width={item.icon.width}
							height={item.icon.height}
							alt=""
							loading="lazy"
							decoding="async"
						/>
						<time className={styles.time}>{item.time}</time>
						<span className={`script ${styles.label}`}>{item.label}</span>
					</li>
				))}
			</ol>
		</Section>
	);
}
