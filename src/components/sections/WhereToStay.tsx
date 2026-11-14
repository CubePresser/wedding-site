import { lodging } from '../../data/details';
import type { OptimizedImage } from '../../lib/images';
import Section from '../ui/Section';
import styles from './WhereToStay.module.css';

interface Props {
	image?: OptimizedImage;
}

export default function WhereToStay({ image }: Props) {
	return (
		<Section tone="photo" image={image}>
			<h2 className={`display ${styles.heading}`} data-reveal>
				Where to stay nearby
			</h2>
			<div className={styles.cards}>
				{lodging.map((option) => (
					<article className={`flow ${styles.card}`} key={option.name} data-reveal>
						<h3 className={`display ${styles.name}`}>{option.name}</h3>
						<address className={styles.address}>
							{option.address.map((line, index) => (
								<span className={styles.line} key={index}>
									{line}
								</span>
							))}
						</address>
						<p>{option.blurb}</p>
						<p>{option.phone}</p>
					</article>
				))}
			</div>
		</Section>
	);
}
