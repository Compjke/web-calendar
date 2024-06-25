import { Input } from '@/shared/ui-kit/Input';
import { useEffect } from 'react';

import { CheckBox } from '@/shared/ui-kit/CheckBox';
import { TextArea } from '@/shared/ui-kit/TextArea';
import { CalendarSelect } from '@/shared/ui-kit/CalendarSelect';
import { Button } from '@/shared/ui-kit/Button';

import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { TestTimepicker } from '@/shared/ui-kit/TimePicker/TimePicker';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useStateSelector } from '@/app/store';
import {
	addNewEvent,
	editEvent,
	setWatchedEvents,
} from '@/entities/event/model/eventSlice';
import { DateField } from './DateField';
import { IFormCreateEventValues } from '@/shared/config/types';
import { useToast } from '@/shared/ui-kit/Toast';

import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import { schema } from '../../model';

import { ICalendar } from '@/entities/calendar';
import style from './create-event-form.module.scss';

interface Props {
	setModalState: React.Dispatch<React.SetStateAction<boolean>>;
	action: 'create' | 'edit';
	startTime?: string;
	endTime?: string;
	isForAllDay?: boolean;
	description?: string;
	title?: string;
	date?: Dayjs;
	calendar?: ICalendar;
	id?: string;
}

export const EventForm = ({
	setModalState,
	action,
	calendar,
	id,
	date,
	description,
	endTime = '00:00 am',
	isForAllDay = false,
	startTime = '00:00 am',
	title,
}: Props) => {
	const dispatch = useAppDispatch();
	const toast = useToast();
	const calendars = useStateSelector((s) => s.calendarReducer.allCalendars);
	const methods = useForm<IFormCreateEventValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			startTime,
			endTime,
			isForAllDay,
			description,
			title,
			date: dayjs(date),
			calendar: calendar ? calendar : calendars[0],
		},
	});

	const {
		handleSubmit,
		formState: { errors },
		formState,
		getValues,
		register,
		reset,
		control,
	} = methods;

	const onSubmit: SubmitHandler<IFormCreateEventValues> = (data) => {
		if (action === 'create') {
			dispatch(
				addNewEvent({
					id: uuidv4(),
					title: data.title,
					calendarId: data.calendar.id,
					date: data.date,
					description: data.description,
					isForAllDay: data.isForAllDay!,
					time: {
						start: data.startTime,
						end: data.endTime,
					},
				})
			);
			toast?.showToast(`Event ${data.title} was created`, 'success');
		}
		if (action === 'edit') {
			const updatedEvent = {
				id: id!,
				title: data.title,
				calendarId: data.calendar.id,
				date: data.date,
				description: data.description,
				isForAllDay: data.isForAllDay!,
				time: {
					start: data.startTime,
					end: data.endTime,
				},
			};
			dispatch(editEvent(updatedEvent));
			dispatch(setWatchedEvents(updatedEvent));

			toast?.showToast('Event was updated', 'info');
		}

		setModalState(false);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
	}, [formState.isSubmitSuccessful, reset]);
	return (
		<FormProvider {...methods}>
			<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='title'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							value={field.value}
							placeholder='Type your title for event...'
							icon='text-icon'
							labelText='Title'
							id='text'
							error={errors.title}
						/>
					)}
				/>

				<div className={style.timeDate}>
					<Controller
						name='date'
						control={control}
						defaultValue={getValues().date}
						render={({ field }) => <DateField {...field} error={errors.date} />}
					/>

					<TestTimepicker
						controls={{ control, name: 'startTime' }}
						required
						defaultValue={getValues().startTime}
						labelText='Time'
						error={errors.startTime}
					/>
					{'-'}
					<TestTimepicker
						controls={{ control, name: 'endTime' }}
						required
						defaultValue={getValues().endTime}
						error={errors.endTime}
					/>
				</div>

				<Controller
					name='isForAllDay'
					control={control}
					render={({ field }) => (
						<CheckBox
							{...field}
							ref={field.ref}
							className={style.checkbox}
							label='All day'
						/>
					)}
				/>

				<Controller
					name='calendar'
					control={control}
					render={({ field }) => (
						<CalendarSelect
							{...field}
							selectedCalendar={field.value || calendars[0]}
							ref={field.ref}
							icon='calendar'
							label='Calendar'
							options={calendars}
							onChange={(opt) => field.onChange(opt)}
						/>
					)}
				/>
				<TextArea
					register={register}
					registerLabel='description'
					label='Description'
					icon='description'
					error={errors.description}
				/>

				<Button className={style.submitBtn} appereance='primary' label='Save' />
			</form>
		</FormProvider>
	);
};
