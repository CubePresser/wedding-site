import { site } from '../../data/site';
import Section from '../ui/Section';
import styles from './OurSpecialDay.module.css';

export default function OurSpecialDay() {
	return (
		<Section tone="photo">
			<div className={`flow ${styles.panel}`}>
				<h2 className={`script ${styles.heading}`}>Our Special Day</h2>
				<p>
					We are so excited to celebrate this wonderful moment in our lives with our closest friends
					and families. Your love and support means the world to us and we can't wait to share this
					unforgettable day with you.
				</p>
				<p>
					As we countdown to our big day we've created a website to keep you updated on all the
					details.
				</p>
				<p>Thank you for being a part of our journey. We can't wait to celebrate with all of you.</p>
				<p>With Love,</p>
				<p className={`script ${styles.signature}`}>
					{site.couple.first} &amp; {site.couple.second}
				</p>
			</div>
		</Section>
	);
}
