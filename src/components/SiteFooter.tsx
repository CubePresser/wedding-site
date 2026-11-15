import { contact } from '../data/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.grid}`}>
				<h2 className={`display ${styles.heading}`} data-reveal>
					Get in touch
				</h2>
				<address className={styles.contact} data-reveal>
					<p>{contact.name}</p>
					<a className={styles.link} href={`mailto:${contact.email}`}>
						{contact.email}
					</a>
				</address>
			</div>
		</footer>
	);
}
