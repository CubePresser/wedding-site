import type { ReactNode } from 'react';
import styles from './Panel.module.css';

interface Props {
	heading: string;
	children: ReactNode;
}

// Interior page from the FAQ mockup: pinstripes, a cream panel, and a script heading across its top edge.
export default function Panel({ heading, children }: Props) {
	return (
		<main className={`bg-stripes-olive ${styles.page}`}>
			<div className={`container ${styles.panel}`}>
				<h1 className={`script ${styles.heading}`}>{heading}</h1>
				{children}
			</div>
		</main>
	);
}
