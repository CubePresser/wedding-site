// Shy header: hides while scrolling down and slides back in, on an olive bar, when scrolling up.
//
// States (styled in SiteHeader.module.css):
//   rest   - the in-page position: transparent over the hero, scrolls away with the page
//   hidden - fixed, parked just above the viewport
//   pinned - fixed and visible
// Without JavaScript the header simply stays at rest.

type State = 'rest' | 'hidden' | 'pinned';

/** Scroll distance needed to count as a change of direction, so trackpad jitter is ignored. */
const TOLERANCE = 6;

function init(header: HTMLElement) {
	let state: State = 'rest';
	let height = header.offsetHeight;
	let lastY = Math.max(0, scrollY);
	let ticking = false;
	// Set while an in-page link scrolls the page, so the bar doesn't slide over the section the
	// visitor just asked for. Cleared when that scroll ends, or by the visitor's next scroll input.
	let holdHidden = false;

	function setState(next: State) {
		if (next === state) return;

		if (state === 'rest') {
			// Leaving the in-page position: park above the viewport without animating, so the bar
			// never flashes in at the top before sliding away. Slides in from there if pinned.
			header.style.transition = 'none';
			header.dataset.state = 'hidden';
			void header.offsetHeight; // apply the parked position before transitions come back
			header.style.transition = '';
		}

		header.dataset.state = state = next;
	}

	function update() {
		ticking = false;
		const y = scrollY;

		// iOS bounces past the end of the page; ignore it so the bounce back doesn't count as scrolling up.
		if (y > document.documentElement.scrollHeight - innerHeight) return;

		if (y <= 0) {
			lastY = 0;
			setState('rest');
			return;
		}

		const delta = y - lastY;
		if (Math.abs(delta) < TOLERANCE) return;
		lastY = y;

		// Near the top, a header at rest just scrolls with the page.
		if (state === 'rest' && y <= height) return;

		setState(delta > 0 || holdHidden ? 'hidden' : 'pinned');
	}

	addEventListener(
		'scroll',
		() => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		},
		{ passive: true },
	);

	addEventListener('resize', () => {
		height = header.offsetHeight;
	});

	// In-page links (e.g. Schedule, Details) and Back/Forward between them.
	document.addEventListener('click', (event) => {
		const link = (event.target as Element).closest?.('a');
		if (link?.hash && link.pathname === location.pathname) {
			holdHidden = true;
			if (state === 'pinned') setState('hidden');
		}
	});
	addEventListener('hashchange', () => {
		holdHidden = true;
	});
	// scrollend covers scrollbar dragging; the input events cover browsers without scrollend.
	for (const type of ['scrollend', 'wheel', 'touchstart', 'keydown', 'pointerdown']) {
		addEventListener(
			type,
			() => {
				holdHidden = false;
			},
			{ passive: true },
		);
	}

	// Keyboard users tabbing back into a hidden header need to see where focus went.
	header.addEventListener('focusin', () => {
		if (state === 'hidden') setState('pinned');
	});
}

const header = document.querySelector<HTMLElement>('[data-shy-header]');
if (header) init(header);
