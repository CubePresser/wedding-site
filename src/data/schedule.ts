import ceremony from '../assets/images/icon-ceremony.png';
import drinks from '../assets/images/icon-drinks.png';
import cake from '../assets/images/icon-cake.png';
import dinner from '../assets/images/icon-dinner.png';
import party from '../assets/images/icon-party.png';
import sendOff from '../assets/images/icon-send-off.png';

export const scheduleIntro = 'Our special day starts at 12:30 in the hotel lobby';

// iconHeight is how tall each drawing appears, in px, matching the mockup. The icon files are
// cropped to the drawing, so this is the drawing's own height (the rings are short and wide).
export const schedule = [
	{ time: '1PM', label: 'Ceremony', icon: ceremony, iconHeight: 72 },
	{ time: '2PM', label: 'Drinks', icon: drinks, iconHeight: 122 },
	{ time: '3PM', label: 'Cake', icon: cake, iconHeight: 121 },
	{ time: '6PM', label: 'Dinner', icon: dinner, iconHeight: 121 },
	{ time: '7PM', label: 'Party', icon: party, iconHeight: 125 },
	{ time: '11PM', label: 'Send Off', icon: sendOff, iconHeight: 119 },
];
