export const calcStyles = (
	start: string,
	end: string,
	calendarColor: string,
	relativeTop: number,
	eventsInTime: number
) => {

	const maxWidth = 100 / eventsInTime + '%';
	const top = parseInt(start.split(':')[1]) - relativeTop + 'px';

	const height = convertIntoMinutes(start, end) + 'px';

	const opacity = '0.3';

	const values = calendarColor.match(/\w\w/g)!;

	// Convert the hex color values to decimal values using parseInt() and store them in r, g, and b
	const [r, g, b] = values.map((k) => parseInt(k, 16));

	// Create the rgba string using the decimal values and opacity
	const rgba = ` rgba( ${r}, ${g}, ${b}, ${opacity} )`;

	return {
		maxWidth,
		top,
		height,
		bgColor: rgba,
	};
};

function convertIntoMinutes(start: string, end: string) {
	const [hoursOfStart, minutesOfStart] = start
		.split(':')
		.map((i) => parseInt(i));
	const [hoursOfEnd, minutesOfEnd] = end.split(':').map((i) => parseInt(i));

	return hoursOfEnd * 60 + minutesOfEnd - (hoursOfStart * 60 + minutesOfStart);
}
