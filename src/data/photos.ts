import heroBackground from '../assets/images/bg-hero.png';
import specialDayBackground from '../assets/images/bg-our-special-day.png';
import whereToStayBackground from '../assets/images/bg-where-to-stay.png';
import engagementImage from '../assets/images/engagement.png';
import lake from '../assets/images/lake.png';
import mountain from '../assets/images/mountain.png';
import paris from '../assets/placeholder/photo-paris.png';

export const backgrounds = {
	hero: heroBackground,
	specialDay: specialDayBackground,
	whereToStay: whereToStayBackground,
};

export const engagement = {
	image: engagementImage,
	alt: 'Alex proposing to Rachel on a rocky overlook',
};

export const gallery = [
	{ image: mountain, alt: 'Rachel and Alex with arms raised on a boulder above a mountain valley' },
	{ image: paris, alt: 'Rachel and Alex taking a selfie in front of the Eiffel Tower' },
	{ image: lake, alt: 'Rachel and Alex in sunglasses taking a selfie by a lake' },
];
