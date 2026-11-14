// The header is rendered at build time from the page path, which can't see #schedule or #details.
// Re-mark the current nav link from the full URL on load and on every hash change.

const normalize = (url: URL | Location) => url.pathname.replace(/(.)\/$/, '$1') + url.hash;

function markCurrentNavLink() {
	const here = normalize(location);

	document.querySelectorAll<HTMLAnchorElement>('a[data-nav-link]').forEach((link) => {
		const target = new URL(link.href);

		if (normalize(target) === here) {
			link.setAttribute('aria-current', target.hash ? 'location' : 'page');
		} else {
			link.removeAttribute('aria-current');
		}
	});
}

markCurrentNavLink();
addEventListener('hashchange', markCurrentNavLink);
