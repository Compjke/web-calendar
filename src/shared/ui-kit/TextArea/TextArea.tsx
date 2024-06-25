import { TextareaHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { Icon, IconName } from '../Icon/Icon';
import { ErrorOption, Path, UseFormRegister } from 'react-hook-form';
import { IFormCreateEventValues } from '@/shared/config/types';
import style from './textarea.module.scss';

interface iTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	placeholder?: string;
	testValue?: string;
	icon?: IconName;
	register: UseFormRegister<IFormCreateEventValues>;
	registerLabel: Path<IFormCreateEventValues>;
	error?: ErrorOption | undefined;
}

export const TextArea = ({
	label,
	placeholder = 'Type your description....',
	testValue,
	icon,
	register,
	error,
	registerLabel,
}: iTextArea) => {
	const [value, setValue] = useState(testValue || '');
	return (
		<div className={style.container}>
			{icon && <Icon name={icon} />}
			<label className={style.label} htmlFor='textarea'>
				<span className={style.labelText}>{label}</span>
				<textarea
					{...register(registerLabel)}
					placeholder={placeholder}
					className={clsx(style.textArea, error && style.errorBorder)}
					id='textarea'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				></textarea>
				{error && <span className={style.error}>{error.message}</span>}
			</label>
		</div>
	);
};
