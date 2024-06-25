import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import localFormat from 'dayjs/plugin/localizedFormat';
// import { v4 as uuidv4 } from 'uuid';

export const getTimesArr = (spanOfTime = 15, endPoind = 96) => {
	// dayjs.extend(relativeTime);
	// dayjs.extend(localFormat);

	let someStart = dayjs().set('h', 0).set('m', 0);
	// console.log(someStart.format('HH:mm a'))
	const result = [];

	for (let i = 0; i < endPoind; i++) {
		// const id = uuidv4();
		result.push(someStart.format('HH:mm a'));

		someStart = someStart.set('m', someStart.get('m') + spanOfTime);
	}

	return result;
};
