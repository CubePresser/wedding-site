import type { ComponentPropsWithoutRef } from 'react';
import type { Photo } from '../../lib/images';
import styles from './FramedPhoto.module.css';

interface Props extends Photo, Omit<ComponentPropsWithoutRef<'figure'>, 'children'> {
	variant?: 'double' | 'polaroid';
}

export default function FramedPhoto({ image, alt, variant = 'polaroid', className, ...rest }: Props) {
	return (
		<figure {...rest} className={`${styles.frame} ${styles[variant]} ${className ?? ''}`}>
			<img
				className={styles.photo}
				src={image.src}
				srcSet={image.srcSet}
				width={image.width}
				height={image.height}
				alt={alt}
				loading="lazy"
				decoding="async"
			/>
		</figure>
	);
}
