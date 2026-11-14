import { details } from '../../data/details';
import Section from '../ui/Section';
import styles from './OtherDetails.module.css';

export default function OtherDetails() {
	return (
		<Section id="details">
			<h2 className={`script ${styles.heading}`}>Other Details</h2>
			<div className={styles.grid}>
				{details.map((detail) => (
					<article key={detail.title}>
						<h3 className={`display ${styles.title}`}>{detail.title}</h3>
						<div className="flow">
							{detail.body.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</article>
				))}
			</div>
		</Section>
	);
}
