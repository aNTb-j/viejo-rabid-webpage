import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Button } from 'react-bootstrap';;
import { errorToast, successToast } from '../toast/toast.js'

import { GenericForm } from '../forms/GenericForm.jsx';

import styles from './Register.module.css'


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

		// Validaciones de formato
		if (dni.trim() && !/^\d{7,8}$/.test(dni)) {
			newErrors.dni = true;
		} else if (!dni.trim()) {
			newErrors.dni = true;
		}

		if (
			email.trim() &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		) {
			newErrors.emailFormat = true;
		}

		if (!password) {
			newErrors.password = true;
		} else if (password.length < 8) {
			newErrors.passwordLength = true;
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = true;
		} else if (password !== confirmPassword) {
			newErrors.passwordMatch = true;
		}

		// Si existen errores, no se envía el formulario
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
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

			// Evita que un error con respuesta no JSON rompa el manejo
			// de errores del formulario.
			let result;

			try {
				result = await response.json();
			} catch {
				throw new Error('El servidor devolvió una respuesta inválida.');
			}

			if (!response.ok) {
				throw new Error(
					result.message || 'No se pudo completar el registro.'
				);
			}

			successToast(result.message || 'Registro exitoso');
			navigate('/login');
		} catch (error) {
			console.error('Error en el registro:', error);
			errorToast(error.message || 'Error de conexión con el servidor.');
		} finally {
			setLoading(false);
		}
	};



	return (
		<div className={styles.registerPage}>
			<Card className={styles.registerCard}>
				<Card.Body className={styles.registerBody}>
					<div className={styles.header}>
						<span className={styles.eyebrow}>VIEJO RABID</span>

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
								label="Usuario"
								placeholder="Ingresar usuario"
								value={user}
								onChange={e => setUser(e.target.value)}
								error={errors.user ? 'Debe ingresar un usuario.' : ''}
								className={styles.field}
							/>

							<GenericForm
								id="username"
								label="Nombre"
								placeholder="Ingresar nombre"
								value={username}
								onChange={e => setUsername(e.target.value)}
								error={errors.username ? 'Debe ingresar un nombre.' : ''}
								className={styles.field}
							/>

							<GenericForm
								id="surname"
								label="Apellido"
								placeholder="Ingresar apellido"
								value={surname}
								onChange={e => setSurname(e.target.value)}
								error={errors.surname ? 'Debe ingresar un apellido.' : ''}
								className={styles.field}
							/>

							<GenericForm
								id="dni"
								label="DNI"
								type="text"
								inputMode="numeric"
								placeholder="Ingresar DNI"
								value={dni}
								onChange={e => setDni(e.target.value)}
								error={errors.dni ? 'Debe ingresar un DNI válido.' : ''}
								className={styles.field}
							/>

							<GenericForm
								id="email"
								label="Correo electrónico"
								type="email"
								placeholder="Ingresar email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								error={
									errors.emailFormat
										? 'Ingrese un email válido.'
										: errors.email
											? 'Debe ingresar un email.'
											: ''
								}
								className={styles.field}
							/>

							<GenericForm
								id="birthdate"
								label="Fecha de nacimiento"
								type="date"
								value={birthdate}
								onChange={e => setBirthdate(e.target.value)}
								error={
									errors.birthdate
										? 'Debe ingresar la fecha de nacimiento.'
										: ''
								}
								className={styles.field}
							/>

							<GenericForm
								id="phoneNumber"
								label="Teléfono"
								type="tel"
								placeholder="Ingresar teléfono"
								value={phoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
								error={
									errors.phoneNumber
										? 'Debe ingresar un teléfono.'
										: ''
								}
								className={styles.field}
							/>

							<div className={styles.sectionLabel}>
								Seguridad de la cuenta
							</div>

							<GenericForm
								id="password"
								label="Contraseña"
								type="password"
								placeholder="Mínimo 8 caracteres"
								value={password}
								onChange={e => setPassword(e.target.value)}
								error={
									errors.passwordLength
										? 'La contraseña debe tener al menos 8 caracteres.'
										: errors.password
											? 'Debe ingresar una contraseña.'
											: ''
								}
								className={styles.field}
							/>

							<GenericForm
								id="confirmPassword"
								label="Confirmar contraseña"
								type="password"
								placeholder="Repetir contraseña"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								error={
									errors.passwordMatch
										? 'Las contraseñas no coinciden.'
										: errors.confirmPassword
											? 'Debe confirmar la contraseña.'
											: ''
								}
								className={styles.field}
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
}

export default Register;
