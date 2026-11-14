import { navLinks } from '../data/site';
import type { OptimizedImage } from '../lib/images';
import styles from './SiteHeader.module.css';

interface Props {
	currentPath: string;
	logo: OptimizedImage;
}

// At rest it sits on top of each page's first section, so that section must have a dark background.
// src/scripts/shy-header.ts moves it between its data-state values as the page scrolls.
export default function SiteHeader({ currentPath, logo }: Props) {
	const path = currentPath.replace(/(.)\/$/, '$1');

	const renderLinks = (links: typeof navLinks.left) =>
		links.map((link) => (
			<li key={link.href}>
				<a
					className={styles.link}
					href={link.href}
					// Server-side this only knows the path; a script in BaseLayout corrects it for #hash links.
					aria-current={path === link.href ? 'page' : undefined}
					data-nav-link
				>
					{link.label}
				</a>
			</li>
		));

	return (
		<header className={styles.header} data-shy-header data-state="rest">
			<nav className="container" aria-label="Main">
				<ul className={styles.list}>
					{renderLinks(navLinks.left)}
					<li>
						<a className={`${styles.link} ${styles.monogram}`} href="/" aria-label="Rachel & Alex, home">
							<img
								className={styles.logo}
								src={logo.src}
								srcSet={logo.srcSet}
								width={logo.width}
								height={logo.height}
								alt=""
							/>
						</a>
					</li>
					{renderLinks(navLinks.right)}
				</ul>
			</nav>
		</header>
	);
}
