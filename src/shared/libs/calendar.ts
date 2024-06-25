import dayjs from 'dayjs';

export const generateDate = (
	month = dayjs().month(),
	year = dayjs().year()
) => {
	const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
	const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');

	const arrayofDates = [];

	// create prefix date

	for (let i = 0; i < firstDayOfMonth.day(); i++) {
		arrayofDates.push({ currentMonth: false, date: firstDayOfMonth.day(i) });
	}

	// generate current date
	for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
		arrayofDates.push({
			currentMonth: true,
			date: firstDayOfMonth.date(i),
			today:
				firstDayOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}
	// console.log(arrayofDates);
	const remaining = 42 - arrayofDates.length;

	for (
		let i = lastDayOfMonth.date() + 1;
		i <= lastDayOfMonth.date() + remaining;
		i++
	) {
		arrayofDates.push({ currentMonth: false, date: lastDayOfMonth.date(i) });
	}
	// console.log(arrayofDates);
	return arrayofDates;
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
