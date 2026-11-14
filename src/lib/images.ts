import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export interface OptimizedImage {
	src: string;
	srcSet?: string;
	width: number;
	height: number;
}

export interface Photo {
	image: OptimizedImage;
	alt: string;
}

// astro:assets only works on the server, so pages call this and pass the result to React
// components as props. Components must import from this file with `import type` only.
export async function optimizeImage(
	image: ImageMetadata,
	options: { widths?: number[] } = {},
): Promise<OptimizedImage> {
	const { src, srcSet } = await getImage({ src: image, ...options });

	return {
		src,
		srcSet: srcSet.attribute || undefined,
		width: image.width,
		height: image.height,
	};
}
