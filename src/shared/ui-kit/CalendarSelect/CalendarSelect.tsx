import { LegacyRef, forwardRef, useEffect, useRef, useState } from 'react';
import { ICalendar } from '@/entities/calendar';
import { Icon, IconName } from '../Icon/Icon';
import styles from './select.module.scss';

type SelectProps = {
	icon?: IconName;
	label?: string;
	options: ICalendar[];
	onChange: (value: ICalendar | undefined) => void;
	selectedCalendar?: ICalendar;
};

export const CalendarSelect = forwardRef(
	(
		{ onChange, options, icon, label, selectedCalendar, ...props }: SelectProps,
		ref: LegacyRef<HTMLSpanElement>
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [highlightedIndex, setHighlightedIndex] = useState(0);
		const [value, setValue] = useState(selectedCalendar);
		const containerRef = useRef<HTMLDivElement>(null);

		function selectOption(option: ICalendar) {
			if (option !== value) {
				setValue(option);
				onChange(option);
			}
		}

		function isOptionSelected(option: ICalendar) {
			return option === value;
		}

		useEffect(() => {}, []);

		useEffect(() => {
			if (isOpen) setHighlightedIndex(0);
		}, [isOpen]);

		useEffect(() => {
			const handler = (e: KeyboardEvent) => {
				if (e.target != containerRef.current) return;
				switch (e.code) {
					case 'Enter':
					case 'Space':
						setIsOpen((prev) => !prev);
						if (isOpen) selectOption(options[highlightedIndex]);
						break;
					case 'ArrowUp':
					case 'ArrowDown': {
						if (!isOpen) {
							setIsOpen(true);
							break;
						}

						const newValue =
							highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
						if (newValue >= 0 && newValue < options.length) {
							setHighlightedIndex(newValue);
						}
						break;
					}
					case 'Escape':
						setIsOpen(false);
						break;
				}
			};
			containerRef.current?.addEventListener('keydown', handler);

			return () => {
				containerRef.current?.removeEventListener('keydown', handler);
			};
		}, [isOpen, highlightedIndex, options]);

		return (
			<div>
				<label className={styles.label}>{label}</label>
				<div className={styles.wrapper}>
					{icon && <Icon name='calendar' />}
					<div
						ref={containerRef}
						onBlur={() => setIsOpen(false)}
						onClick={() => setIsOpen((prev) => !prev)}
						tabIndex={0}
						className={styles.container}
					>
						<span className={styles.value} ref={ref}>
							<span
								className={styles.optionColor}
								style={{ backgroundColor: value?.color }}
							></span>
							{value?.label}
						</span>

						<div className={styles.caret}></div>
						<ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
							{options.map((option, index) => (
								<li
									onClick={(e) => {
										e.stopPropagation();
										selectOption(option);
										setIsOpen(false);
									}}
									onMouseEnter={() => setHighlightedIndex(index)}
									key={option.id}
									data-color={option.color}
									className={`${styles.option} ${
										isOptionSelected(option) ? styles.selected : ''
									} ${index === highlightedIndex ? styles.highlighted : ''}`}
								>
									<span
										style={{ backgroundColor: option.color }}
										className={styles.optionColor}
									/>
									{option.label}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
);
