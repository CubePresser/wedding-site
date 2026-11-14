import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
	href: string;
	children: ReactNode;
}

export default function Button({ href, children }: Props) {
	return (
		<a href={href} className={`display ${styles.button}`}>
			{children}
		</a>
	);
}
