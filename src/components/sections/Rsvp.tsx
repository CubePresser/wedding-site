import { site } from '../../data/site';
import Button from '../ui/Button';
import Section from '../ui/Section';
import styles from './Rsvp.module.css';

export default function Rsvp() {
	return (
		<Section tone="stripes">
			<div className={styles.rsvp}>
				<h2 className={`display ${styles.heading}`} data-reveal>
					<span className="script">Please</span> RSVP
				</h2>
				<p className={styles.text} data-reveal>
					Kindly let us know if you'll be joining us. Your response helps us prepare for the day.
					Please submit your RSVP through the link below no later than {site.rsvp.deadline}.
				</p>
				<Button href={site.rsvp.url} data-reveal>
					RSVP here
				</Button>
			</div>
		</Section>
	);
}
