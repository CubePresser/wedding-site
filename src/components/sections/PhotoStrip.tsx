import type { Photo } from '../../lib/images';
import FramedPhoto from '../ui/FramedPhoto';
import Section from '../ui/Section';
import styles from './PhotoStrip.module.css';

interface Props {
	photos: Photo[];
}

export default function PhotoStrip({ photos }: Props) {
	return (
		<Section tone="stripes">
			<div className={styles.photos}>
				{photos.map((photo) => (
					<FramedPhoto key={photo.image.src} image={photo.image} alt={photo.alt} />
				))}
			</div>
		</Section>
	);
}
