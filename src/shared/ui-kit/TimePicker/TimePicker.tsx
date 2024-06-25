import { SetStateAction, useEffect, useRef, useState } from 'react';
import { getTimesArr } from '@/shared/libs/time';
import { IFormCreateEventValues } from '@/shared/config/types';
import {
	ErrorOption,
	UseControllerProps,
	useController,
	useFormContext,
} from 'react-hook-form';
import dayjs from 'dayjs';
import clsx from 'clsx';
import style from './time.module.scss';

interface ITimePicker {
	className?: string;
	labelText?: string;
	onSelect?: (item: string) => void;
	options?: string[];
	defaultValue?: string;
	disabled?: boolean;
	required?: boolean;
	controls: UseControllerProps<IFormCreateEventValues>;
	error?: ErrorOption | undefined;
}

export const TestTimepicker = ({
	className,
	labelText,
	onSelect,
	options = getTimesArr(),
	defaultValue = dayjs().format('HH:mm a'),
	disabled,
	controls,
	error,
}: ITimePicker) => {
	const { field } = useController(controls);
	const { watch, setValue } = useFormContext<IFormCreateEventValues>();
	const [open, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [selectedValue, setSelectedValue] = useState(defaultValue);


	const handleClick = (value: SetStateAction<string>) => {
		setSelectedValue(value);
		field.onChange(value);
		onSelect?.(selectedValue);
		setOpen(false);
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = selectedValue;
		}
	}, [selectedValue]);

	useEffect(() => {
		if (inputRef.current && watch('isForAllDay')) {
			setValue('startTime', '00:00 am');
			setValue('endTime', '24:00 pm');
			setSelectedValue(field.name === 'startTime' ? '00:00 am' : '24:00 pm');
		}
	}, [setValue, watch('isForAllDay')]);

	return (
		<div className={clsx(style.select, className)}>
			<label className={style.selectLabel}>
				{labelText}
				<input
					readOnly
					value={selectedValue}
					disabled={disabled || watch('isForAllDay')}
					onClick={() => setOpen((prev) => !prev)}
					className={clsx(style.selectInput, error && style.errorBorder)}
					ref={inputRef}
				/>
				{error && <span className={style.error}>{error.message}</span>}
			</label>
			<div className={''}>
				{open && (
					<ul className={style.selectContent}>
						{options.map((item) => (
							<li
								data-testid='select-item'
								onClick={() => handleClick(item)}
								key={item}
								className={clsx(
									style.selectItem,
									selectedValue === item && style.selected
								)}
							>
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
