import * as yup from 'yup';

export const schema = yup.object().shape({
	title: yup.string().required().min(3),
	color: yup.string().nonNullable().required(),
});
