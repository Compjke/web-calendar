import { InputHTMLAttributes, LegacyRef, forwardRef, useState } from 'react';

import clsx from 'clsx';
import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon';
import { ErrorOption } from 'react-hook-form';
// import {
// 	IFormCreateCalendarValues,
// 	IFormCreateEventValues,
// } from '@/shared/config/types';
import style from './input.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	labelText: string;
	id: string;
	icon?: IconName;
	// register: UseFormRegister<IFormCreateEventValues> | UseFormRegister<IFormCreateCalendarValues>;
	// label: Path<IFormCreateEventValues>;
	error?: ErrorOption | undefined;
}

export const Input = forwardRef(
	(
		{
			type,
			placeholder,
			required,
			error,
			labelText,
			disabled,
			id,
			icon,
			// label,
			value,
			// register,
			...props
		}: IInput,
		ref: LegacyRef<HTMLInputElement> | undefined
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [currentType, setType] = useState(type);

		const handleClick = () => {
			const cur = currentType === 'password' ? 'text' : type;
			setType(cur);
			setShowPassword(!showPassword);
		};

		return (
			<div className={style.inputInner}>
				{icon && <Icon name={icon} className={style.inputIcon} />}
				<div className={style.container}>
					<label className={style.label} htmlFor={id}>
						{labelText}
						{required && '*'}
					</label>
					<input
						// {...register(label)}
						ref={ref}
						value={value || ''}
						disabled={disabled}
						placeholder={placeholder}
						type={currentType}
						className={clsx(style.input, error && style.errorBorder)}
						{...props}
					/>
					{error && <span className={style.error}>{error.message}</span>}
					{type === 'password' ? (
						!showPassword ? (
							<button
								type='button'
								data-testid='hide-password'
								disabled={disabled}
								onClick={handleClick}
								className={style.icon}
							>
								<Icon name='hide-password' />
							</button>
						) : (
							<button
								type='button'
								data-testid='show-password'
								disabled={disabled}
								onClick={handleClick}
								className={style.icon}
							>
								<Icon name='show-password' />
							</button>
						)
					) : null}
				</div>
			</div>
		);
	}
);
