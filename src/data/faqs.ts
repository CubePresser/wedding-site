import { site } from './site';

export const faqs = [
	{
		question: 'When is the wedding?',
		answer: [
			`The wedding will be held on ${site.dateLong}. The ceremony begins at 1pm with the reception to follow.`,
		],
	},
	{
		question: 'Where is the venue?',
		answer: [`The celebration will be held at the ${site.venue.name}.`],
	},
	{
		question: 'What time should guests arrive?',
		answer: [
			'We recommend arriving 30 mins before the start of the ceremony to allow time for parking, seating, and pre-ceremony refreshments. The ceremony will start promptly at 1pm.',
		],
	},
	{
		question: 'What is the dress code?',
		answer: [
			'Our wedding is semi-formal / cocktail attire.',
			'For women, a lovely midi or maxi dress, or a chic suit is perfect. For men, we recommend a suit and tie or a sport coat with slacks. We want everyone to look and feel their best as we celebrate together!',
		],
	},
	{
		question: 'Will there be food?',
		answer: ['Yes! There will be a full service dinner with different options for dietary needs.'],
	},
	{
		question: 'Can I bring children?',
		answer: [
			'Absolutely! We love your little ones and consider them a special part of our lives. Children of all ages are more than welcome to join in the celebration.',
		],
	},
	{
		question: 'Can I bring a plus one?',
		answer: [
			"Your invitation will specify if you have a plus one or not. If your guest's name is listed then we can't wait to meet them! If not we appreciate your understanding that we have limited space.",
		],
	},
	{
		question: 'Is parking available?',
		answer: ["Yes, there is free parking in the hotel's parking lot."],
	},
	{
		question: 'Can I take photos during the ceremony?',
		answer: [
			'We are having an “unplugged ceremony” so we ask that you kindly keep your phones and cameras away until the reception so everyone can be fully present with us. Our photographer will capture every special moment!',
		],
	},
];
