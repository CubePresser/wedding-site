import { contacts } from '../data/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.grid}`}>
				<h2 className={`display ${styles.heading}`}>Get in touch</h2>
				{contacts.map((contact) => (
					<address className={styles.contact} key={contact.name}>
						<p>{contact.name}</p>
						<a className={styles.link} href={`tel:${contact.phone.replace(/\D/g, '')}`}>
							{contact.phone}
						</a>
						<a className={styles.link} href={`mailto:${contact.email}`}>
							{contact.email}
						</a>
					</address>
				))}
			</div>
		</footer>
	);
}
