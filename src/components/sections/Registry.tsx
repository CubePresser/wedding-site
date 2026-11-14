import { site } from '../../data/site';
import Section from '../ui/Section';
import styles from './Registry.module.css';

export default function Registry() {
	return (
		<Section>
			<div className={`flow ${styles.card}`} data-reveal>
				<h2 className={`script ${styles.heading}`}>Registry</h2>
				<p>
					Your presence at our wedding is the greatest gift we could ever ask for! The time, effort,
					and expense you take to travel and celebrate with us is what we treasure most.
				</p>
				<p>
					Thanks to our wonderful parents, our kitchen and home are already fully stocked with the
					essentials (and maybe a few too many coffee mugs!). Because of this, our registry is on the
					smaller side and includes an option to contribute to our honeymoon fund. Contributions
					toward our honeymoon fund will help us fund our dream trip together as newlyweds!
				</p>
				<p>We are so grateful for your love and can't wait to celebrate with you soon!</p>
				<a className={styles.link} href={site.registryUrl}>
					{site.couple.first} &amp; {site.couple.second}'s Registry
				</a>
			</div>
		</Section>
	);
}
