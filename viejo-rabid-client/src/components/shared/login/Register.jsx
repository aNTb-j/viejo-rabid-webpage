
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Button } from 'react-bootstrap';

import { errorToast, successToast } from '../toast/toast.js';
import { GenericForm } from '../forms/GenericForm.jsx';

import styles from '../../../styles/components/register.module.scss';

const Register = () => {
	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [dni, setDni] = useState('');
	const [username, setUsername] = useState('');
	const [surname, setSurname] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	// Manejar cambios y limpiar errores relacionados
	const handleFieldChange = (field, setter, relatedErrors = [field]) => {
		return (event) => {
			setter(event.target.value);

			setErrors(previous => {
				const updated = { ...previous };

				relatedErrors.forEach(error => {
					delete updated[error];
				});

				return updated;
			});
		};
	};

	// Determinar si un campo tiene errores
	const hasError = (...fields) => {
		return fields.some(field => errors[field]);
	};

	const handleRegister = async (event) => {
		event.preventDefault();

		const newErrors = {};

		// Validación de campos obligatorios
		if (!user.trim()) newErrors.user = true;
		if (!username.trim()) newErrors.username = true;
		if (!surname.trim()) newErrors.surname = true;
		if (!email.trim()) newErrors.email = true;
		if (!birthdate) newErrors.birthdate = true;
		if (!phoneNumber.trim()) newErrors.phoneNumber = true;

		// Validación DNI
		if (!/^\d{7,8}$/.test(dni.trim())) {
			newErrors.dni = true;
		}

		// Validación email
		if (
			email.trim() &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		) {
			newErrors.emailFormat = true;
		}

		// Validación contraseña
		if (!password) {
			newErrors.password = true;
		} else if (password.length < 8) {
			newErrors.passwordLength = true;
		}

		// Confirmación contraseña
		if (!confirmPassword) {
			newErrors.confirmPassword = true;
		} else if (password !== confirmPassword) {
			newErrors.passwordMatch = true;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			errorToast('Revisá los campos señalados antes de continuar.');
			return;
		}

		setErrors({});
		setLoading(true);

		const data = {
			user: user.trim(),
			password,
			dni: Number(dni),
			username: username.trim(),
			surname: surname.trim(),
			email: email.trim(),
			birthdate,
			phone_number: phoneNumber.trim()
		};

		try {
			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			let result;

			try {
				result = await response.json();
			} catch {
				throw new Error('El servidor devolvió una respuesta inválida.');
			}

			if (!response.ok) {
				// Relacionar el campo del backend con el frontend
				const fieldMap = {
					user: 'user',
					email: 'email',
					dni: 'dni',
					username: 'username',
					surname: 'surname',
					birthdate: 'birthdate',
					phone_number: 'phoneNumber',
					phoneNumber: 'phoneNumber',
					password: 'password'
				};

				const errorField = fieldMap[result.field];

				if (errorField) {
					setErrors(previous => ({
						...previous,
						[errorField]: true
					}));
				}

				errorToast(
					result.message || 'No se pudo completar el registro.'
				);

				return;
			}

			successToast(result.message || 'Registro exitoso');
			navigate('/login');

		} catch (error) {
			console.error('Error en el registro:', error);

			errorToast(
				error.message || 'Error de conexión con el servidor.'
			);

		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.registerPage}>
			<Card className={styles.registerCard}>
				<Card.Body className={styles.registerBody}>

					<div className={styles.header}>
						<span className={styles.eyebrow}>
							VIEJO RABID
						</span>

						<Card.Title className={styles.title}>
							Crear cuenta
						</Card.Title>

						<p className={styles.subtitle}>
							Completá tus datos para registrarte.
						</p>
					</div>

					<Form onSubmit={handleRegister} noValidate>
						<div className={styles.formGrid}>

							<GenericForm
								id="user"
								text="Usuario"
								placeholder="Ingresar usuario"
								value={user}
								onChange={handleFieldChange('user', setUser)}
								error={errors.user ? 'Usuario no disponible o inválido.' : ''}
								className={`${styles.field} ${hasError('user') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="username"
								text="Nombre"
								placeholder="Ingresar nombre"
								value={username}
								onChange={handleFieldChange('username', setUsername)}
								error={errors.username ? 'Debe ingresar un nombre.' : ''}
								className={`${styles.field} ${hasError('username') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="surname"
								text="Apellido"
								placeholder="Ingresar apellido"
								value={surname}
								onChange={handleFieldChange('surname', setSurname)}
								error={errors.surname ? 'Debe ingresar un apellido.' : ''}
								className={`${styles.field} ${hasError('surname') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="dni"
								text="DNI"
								type="text"
								inputMode="numeric"
								placeholder="Ingresar DNI"
								value={dni}
								onChange={handleFieldChange('dni', setDni)}
								error={errors.dni ? 'Debe ingresar un DNI válido.' : ''}
								className={`${styles.field} ${hasError('dni') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="email"
								text="Correo electrónico"
								type="email"
								placeholder="Ingresar email"
								value={email}
								onChange={handleFieldChange(
									'email',
									setEmail,
									['email', 'emailFormat']
								)}
								error={
									errors.emailFormat
										? 'Ingrese un email válido.'
										: errors.email
											? 'El correo electrónico no está disponible o es obligatorio.'
											: ''
								}
								className={`${styles.field} ${hasError('email', 'emailFormat') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="birthdate"
								text="Fecha de nacimiento"
								type="date"
								value={birthdate}
								onChange={handleFieldChange('birthdate', setBirthdate)}
								error={errors.birthdate ? 'Debe ingresar la fecha de nacimiento.' : ''}
								className={`${styles.field} ${hasError('birthdate') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="phoneNumber"
								text="Teléfono"
								type="tel"
								placeholder="Ingresar teléfono"
								value={phoneNumber}
								onChange={handleFieldChange('phoneNumber', setPhoneNumber)}
								error={errors.phoneNumber ? 'Debe ingresar un teléfono.' : ''}
								className={`${styles.field} ${hasError('phoneNumber') ? styles.invalidField : ''}`}
							/>

							<div className={styles.sectionLabel}>
								Seguridad de la cuenta
							</div>

							<GenericForm
								id="password"
								text="Contraseña"
								type="password"
								placeholder="Mínimo 8 caracteres"
								value={password}
								onChange={handleFieldChange(
									'password',
									setPassword,
									['password', 'passwordLength', 'passwordMatch']
								)}
								error={
									errors.passwordLength
										? 'La contraseña debe tener al menos 8 caracteres.'
										: errors.password
											? 'Debe ingresar una contraseña.'
											: ''
								}
								className={`${styles.field} ${hasError('password', 'passwordLength') ? styles.invalidField : ''}`}
							/>

							<GenericForm
								id="confirmPassword"
								text="Confirmar contraseña"
								type="password"
								placeholder="Repetir contraseña"
								value={confirmPassword}
								onChange={handleFieldChange(
									'confirmPassword',
									setConfirmPassword,
									['confirmPassword', 'passwordMatch']
								)}
								error={
									errors.passwordMatch
										? 'Las contraseñas no coinciden.'
										: errors.confirmPassword
											? 'Debe confirmar la contraseña.'
											: ''
								}
								className={`${styles.field} ${hasError('confirmPassword', 'passwordMatch') ? styles.invalidField : ''}`}
							/>

						</div>

						<Button
							variant="secondary"
							type="submit"
							className={styles.submitButton}
							disabled={loading}
						>
							{loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Register;
