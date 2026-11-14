import type { ImageMetadata, ImageTransform } from 'astro';
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

type ImageOptions = Omit<ImageTransform, 'src'>;

// Output sizes for each place an image appears. Keep these in step with the matching CSS.
export const imagePresets = {
	/** Full-bleed section backgrounds, served with sizes="100vw". */
	backdrop: { widths: [768, 1280, 1920, 2560] },
	/** Photo inside the double frame in DateVenue, cropped to the mockup's portrait shape. */
	framed: { width: 380, height: 533, fit: 'cover', densities: [1, 2] },
	/** Photos inside the PhotoStrip polaroids. */
	polaroid: { width: 290, height: 316, fit: 'cover', densities: [1, 2] },
	/** Monogram in the header. */
	logo: { height: 76, densities: [1, 2] },
} satisfies Record<string, ImageOptions>;

// astro:assets only works on the server, so pages call this and pass the result to React
// components as props. Components must import from this file with `import type` only.
export async function optimizeImage(
	image: ImageMetadata,
	options: ImageOptions = {},
): Promise<OptimizedImage> {
	const { src, srcSet, attributes } = await getImage({ src: image, ...options });

	return {
		src,
		srcSet: srcSet.attribute || undefined,
		width: Number(attributes.width ?? image.width),
		height: Number(attributes.height ?? image.height),
	};
}
