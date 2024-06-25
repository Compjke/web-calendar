import { DatePicker } from '@/shared/ui-kit/DatePicker';
import { Input } from '@/shared/ui-kit/Input';

import { LegacyRef, forwardRef, useState } from 'react';
import { ErrorOption } from 'react-hook-form';
import style from './create-event-form.module.scss';
import dayjs from 'dayjs';

interface Props {
	error: ErrorOption | undefined;
}

export const DateField = forwardRef(
	(
		{ error, ...props }: Props,
		ref: LegacyRef<HTMLInputElement> | undefined
	) => {
		const [isDatePicking, setIsDatePicking] = useState(false);

		return (
			<div className={style.date}>
				<Input
					ref={ref}
					id='date'
					labelText='Date'
					icon='clock'
					value={dayjs(props.value).format('dddd, MMMM, D')}
					onClick={() => setIsDatePicking(true)}
					error={error}
					readOnly
				/>
				{isDatePicking && (
					<DatePicker
						onMouseLeave={() => setIsDatePicking(false)}
						onDatePick={(date) => {
							setIsDatePicking(false);
							props?.onChange(date);
						}}
						selectedDate={props.value}
						className={style.datePicker}
					/>
				)}
			</div>
		);
	}
);
