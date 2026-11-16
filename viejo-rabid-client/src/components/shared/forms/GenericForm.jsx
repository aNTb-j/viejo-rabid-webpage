
import Form from 'react-bootstrap/Form';

export const GenericForm = ({
	id,
	text,
	type = 'text',
	placeholder = '',
	value,
	onChange,
	onBlur,
	inputRef,
	name,
	description,
	error,
	className = '',
	required = false,
	disabled = false,
	as = 'input',
	...props
}) => {
	const isInvalid = Boolean(error);

	return (
		<Form.Group className={className}>
			<Form.Label htmlFor={id}>
				{text}
				{required && ' *'}
			</Form.Label>

			<Form.Control
				{...props}
				as={as}
				id={id}
				name={name ?? id}
				type={as === 'input' ? type : undefined}
				ref={inputRef}
				placeholder={placeholder}
				value={value ?? ''}
				onChange={onChange}
				onBlur={onBlur}
				required={required}
				disabled={disabled}
				isInvalid={isInvalid}
				aria-invalid={isInvalid}
				max={type === 'date' ? new Date().toISOString().split('T')[0] : props.max}
				aria-describedby={
					error
						? `${id}-error`
						: description
							? `${id}-description`
							: undefined
				}
			/>

			{error && (
				<Form.Control.Feedback
					id={`${id}-error`}
					type="invalid"
				>
					{error}
				</Form.Control.Feedback>
			)}

			{description && !error && (
				<Form.Text id={`${id}-description`} muted>
					{description}
				</Form.Text>
			)}
		</Form.Group>
	);
};
