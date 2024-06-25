import dayjs, { Dayjs } from 'dayjs';

export function getDaysBetweenCustom(start: string | Dayjs, end: number) {
	const range = [];
	let current = dayjs(start);

	for (let index = 0; index < end; index++) {
		range.push(current);
		current = current.add(1, 'days');
	}
	return range;
}
