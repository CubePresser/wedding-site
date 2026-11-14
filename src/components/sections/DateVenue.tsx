import { site } from '../../data/site';
import type { Photo } from '../../lib/images';
import FramedPhoto from '../ui/FramedPhoto';
import styles from './DateVenue.module.css';

interface Props {
	photo: Photo;
}

export default function DateVenue({ photo }: Props) {
	return (
		<section className={styles.section}>
			<div className={`bg-stripes-stone ${styles.band}`} />
			<div className={`container ${styles.grid}`}>
				<FramedPhoto image={photo.image} alt={photo.alt} variant="double" data-reveal />
				<div className={styles.whenWhere} data-reveal>
					<p className={`script ${styles.date}`}>{site.dateShort}</p>
					<p className={`script ${styles.at}`}>at</p>
					<p className={`display ${styles.venue}`}>
						{site.venue.name}, {site.venue.region}
					</p>
				</div>
			</div>
		</section>
	);
}
