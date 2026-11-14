import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

interface Props extends ComponentPropsWithoutRef<'a'> {
	href: string;
}

export default function Button({ className, children, ...rest }: Props) {
	return (
		<a {...rest} className={`display ${styles.button} ${className ?? ''}`}>
			{children}
		</a>
	);
}
