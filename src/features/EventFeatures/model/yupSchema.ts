import dayjs from 'dayjs';
import * as yup from 'yup';

const startTimeLessThanEndTime = (startTime: string, endTime: string) => {
	if (!startTime || !endTime) {
		return true; // allow empty values
	}

	const startTimeParts = startTime.split(' ');
	const endTimeParts = endTime.split(' ');

	const startTimeHour = parseInt(startTimeParts[0].split(':')[0]);
	const startTimeMinute = parseInt(startTimeParts[0].split(':')[1]);
	const startTimeAmPm = startTimeParts[1].toLowerCase();

	const endTimeHour = parseInt(endTimeParts[0].split(':')[0]);
	const endTimeMinute = parseInt(endTimeParts[0].split(':')[1]);
	const endTimeAmPm = endTimeParts[1].toLowerCase();

	let startTimeHourIn24Format = startTimeHour;
	let endTimeHourIn24Format = endTimeHour;

	if (startTimeAmPm === 'pm' && startTimeHour !== 12) {
		startTimeHourIn24Format += 12;
	}
	if (endTimeAmPm === 'pm' && endTimeHour !== 12) {
		endTimeHourIn24Format += 12;
	}

	if (startTimeAmPm === 'am' && startTimeHour === 12) {
		startTimeHourIn24Format = 0;
	}
	if (endTimeAmPm === 'am' && endTimeHour === 12) {
		endTimeHourIn24Format = 0;
	}

	const startTimeInMinutes = startTimeHourIn24Format * 60 + startTimeMinute;
	const endTimeInMinutes = endTimeHourIn24Format * 60 + endTimeMinute;

	return startTimeInMinutes < endTimeInMinutes;
};

export const schema = yup.object().shape({
	startTime: yup
		.string()
		.test(
			'startTimeLessThanEndTime',
			'Start time must be before end time',
			function (value) {
				const { parent } = this;
				const endTime = parent.endTime;
				return startTimeLessThanEndTime(value!, endTime);
			}
		),
	endTime: yup
		.string()
		.test(
			'startTimeLessThanEndTime',
			'End time must be after start time',
			function (value) {
				const { parent } = this;
				const startTime = parent.startTime;
				return startTimeLessThanEndTime(startTime, value!);
			}
		),
	title: yup.string().required().min(5),
	date: yup.date().test('isValidDate', 'Invalid date', (value) => {
		if (!value) return true; // allow empty values
		const dayjsDate = dayjs(value);
		return dayjsDate.isValid();
	}),
	description: yup.string().required(),
	isForAllDay: yup.boolean().optional(),
});
