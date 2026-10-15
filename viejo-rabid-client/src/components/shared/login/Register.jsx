import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Button } from 'react-bootstrap';;
import { errorToast, successToast } from '../toast/toast.js'

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
							<Form.Group className={styles.field}>
								<Form.Label>Usuario</Form.Label>
								<Form.Control
									type="text"
									placeholder="Ingresar usuario"
									value={user}
									onChange={(e) => setUser(e.target.value)}
									isInvalid={!!errors.user}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar un usuario.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Ingresar nombre"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									isInvalid={!!errors.username}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar un nombre.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Apellido</Form.Label>
								<Form.Control
									type="text"
									placeholder="Ingresar apellido"
									value={surname}
									onChange={(e) => setSurname(e.target.value)}
									isInvalid={!!errors.surname}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar un apellido.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>DNI</Form.Label>
								<Form.Control
									type="text"
									inputMode="numeric"
									placeholder="Ingresar DNI"
									value={dni}
									onChange={(e) => setDni(e.target.value)}
									isInvalid={!!errors.dni}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar un DNI válido.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Correo electrónico</Form.Label>
								<Form.Control
									type="email"
									placeholder="Ingresar email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									isInvalid={!!errors.email || !!errors.emailFormat}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.emailFormat
										? 'Ingrese un email válido.'
										: 'Debe ingresar un email.'}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Fecha de nacimiento</Form.Label>
								<Form.Control
									type="date"
									aria-label="Fecha de nacimiento"
									value={birthdate}
									onChange={(e) => setBirthdate(e.target.value)}
									isInvalid={!!errors.birthdate}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar la fecha de nacimiento.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Teléfono</Form.Label>
								<Form.Control
									type="tel"
									placeholder="Ingresar teléfono"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									isInvalid={!!errors.phoneNumber}
								/>
								<Form.Control.Feedback type="invalid">
									Debe ingresar un teléfono.
								</Form.Control.Feedback>
							</Form.Group>

							<div className={styles.sectionLabel}>
								Seguridad de la cuenta
							</div>

							<Form.Group className={styles.field}>
								<Form.Label>Contraseña</Form.Label>
								<Form.Control
									type="password"
									placeholder="Mínimo 8 caracteres"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									isInvalid={
										!!errors.password ||
										!!errors.passwordLength
									}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.passwordLength
										? 'La contraseña debe tener al menos 8 caracteres.'
										: 'Debe ingresar una contraseña.'}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className={styles.field}>
								<Form.Label>Confirmar contraseña</Form.Label>
								<Form.Control
									type="password"
									placeholder="Repetir contraseña"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									isInvalid={
										!!errors.confirmPassword ||
										!!errors.passwordMatch
									}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.passwordMatch
										? 'Las contraseñas no coinciden.'
										: 'Debe confirmar la contraseña.'}
								</Form.Control.Feedback>
							</Form.Group>
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
