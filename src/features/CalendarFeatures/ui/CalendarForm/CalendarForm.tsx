import { colorsArr } from '@/shared/config';
import { IFormCreateCalendarValues } from '@/shared/config/types';
import { Button } from '@/shared/ui-kit/Button';
import { ColorPicker } from '@/shared/ui-kit/ColorPicker';
import { Input } from '@/shared/ui-kit/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../model/yupSchema';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store';
import { addNewCalendar, editCalendar } from '@/entities/calendar';
import { v4 as uuid } from 'uuid';
import style from './calendar-form.module.scss';
import { useToast } from '@/shared/ui-kit/Toast';

interface Props {
	onModalCLose: () => void;
	title?: string;
	calendarId?: string;
	color?: (typeof colorsArr)[number] | string;
	action: 'create' | 'edit';
}

export const CalendarForm = ({
	onModalCLose,
	title,
	color = colorsArr[0],
	action,
	calendarId,
}: Props) => {
	const dispatch = useAppDispatch();
	const toast = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<IFormCreateCalendarValues>({
		defaultValues: {
			title,
			color,
		},
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<IFormCreateCalendarValues> = (data) => {
		if (action === 'create') {
			dispatch(
				addNewCalendar({
					id: uuid(),
					label: data.title,
					color: data.color,
					isDefault: false,
				})
			);
			toast?.showToast(`Calendar ${data.title} was created`, 'info');
		} else {
			dispatch(
				editCalendar({
					id: calendarId!,
					color: data.color,
					label: data.title,
				})
			);
			toast?.showToast(`Calendar was updated`, 'info');
		}

		onModalCLose();
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	});

	return (
		<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='title'
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						placeholder='Type your anme for calendar...'
						icon='text-icon'
						labelText='Title'
						id='text'
						onChange={(e) => field.onChange(e.target.value)}
						error={errors.title}
					/>
				)}
			/>
			<Controller
				name='color'
				control={control}
				render={({ field }) => (
					<ColorPicker
						onSelect={(color) => {
							field.onChange(color);
						}}
						seletedColor={color}
						errors={errors.color}
						colors={colorsArr}
						icon='color-picker'
					/>
				)}
			/>
			<Button label='Save' appereance='primary' className={style.submitBtn} />
		</form>
	);
};
