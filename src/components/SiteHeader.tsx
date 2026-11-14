import { navLinks } from '../data/site';
import Monogram from './ui/Monogram';
import styles from './SiteHeader.module.css';

interface Props {
	currentPath: string;
}

// Sits on top of each page's first section, so that section must have a dark background.
export default function SiteHeader({ currentPath }: Props) {
	const path = currentPath.replace(/(.)\/$/, '$1');

	const renderLinks = (links: typeof navLinks.left) =>
		links.map((link) => (
			<li key={link.href}>
				<a
					className={styles.link}
					href={link.href}
					aria-current={path === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			</li>
		));

	return (
		<header className={styles.header}>
			<nav className="container" aria-label="Main">
				<ul className={styles.list}>
					{renderLinks(navLinks.left)}
					<li>
						<a className={`${styles.link} ${styles.monogram}`} href="/" aria-label="Rachel & Alex, home">
							<Monogram />
						</a>
					</li>
					{renderLinks(navLinks.right)}
				</ul>
			</nav>
		</header>
	);
}
