// Scroll reveal: [data-reveal] elements fade up into place as they scroll into view (styles in
// global.css). The reveal-ready class that hides them is added by the inline script in
// BaseLayout's <head>, before the first paint, and only when IntersectionObserver exists.
// This file does nothing without that class, so the two can't disagree.

/** Delay between elements that enter the viewport together. */
const STAGGER_MS = 120;
/** Most stagger steps, so a large batch (e.g. a very tall screen) doesn't leave items waiting. */
const MAX_STAGGER_STEPS = 8;

function reveal(el: HTMLElement, index: number) {
	el.style.transitionDelay = `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`;

	// Once finished, drop data-reveal so the element's own transitions (e.g. a button's hover) apply again.
	el.addEventListener('transitionend', function done(event) {
		if (event.target !== el) return;
		el.removeEventListener('transitionend', done);
		el.removeAttribute('data-reveal');
		el.style.transitionDelay = '';
	});

	el.classList.add('is-revealed');
}

if (document.documentElement.classList.contains('reveal-ready')) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries
				.filter((entry) => entry.isIntersecting)
				.forEach((entry, index) => {
					observer.unobserve(entry.target);
					reveal(entry.target as HTMLElement, index);
				});
		},
		// A share of the element rather than an offset from the screen edge, so elements at the very
		// end of the page still reveal once scrolled fully into view.
		{ threshold: 0.15 },
	);

	document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}
