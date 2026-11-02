const date = new Date('2027-09-12T12:00:00-07:00');

const formatDate = (options: Intl.DateTimeFormatOptions) =>
	new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', ...options }).format(date);

export const site = {
	couple: { first: 'Rachel', second: 'Alex' },
	title: "Rachel & Alex's Wedding",
	dateShort: formatDate({ month: 'long', day: 'numeric', year: 'numeric' }),
	dateLong: formatDate({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
	venue: { name: 'Columbia Gorge Hotel', region: 'OR' },
	rsvp: { url: '#', deadline: 'June 1, 2027' }, // TODO: RSVP link
	registryUrl: '#', // TODO: registry link
};

export const navLinks = {
	left: [
		{ label: 'Home', href: '/' },
		{ label: 'Schedule', href: '/schedule' },
	],
	right: [
		{ label: 'Details', href: '/details' },
		{ label: 'FAQs', href: '/faqs' },
	],
};

export const contacts = [
	{ name: 'Rachel', phone: '[redacted]', email: 'gossjones2027@gmail.com' },
	{ name: 'Alex', phone: '[redacted]', email: 'gossjones2027@gmail.com' },
];
