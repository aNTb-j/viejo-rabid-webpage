
import { useContext, useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { GenericForm } from '../forms/GenericForm';

import { useNavigate } from 'react-router';

import { AuthenticationContext } from '../auth/auth.context';
import { errorToast, successToast } from "../../shared/toast/toast";

import styles from '../../../styles/components/login.module.scss';

const Login = () => {
	const { handleUserLogin } = useContext(AuthenticationContext);

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState({
		user: false,
		password: false
	});

	const [loading, setLoading] = useState(false);

	const userRef = useRef(null);
	const passwordRef = useRef(null);

	const navigate = useNavigate();

	const handleUserChange = (event) => {
		setUser(event.target.value);

		setErrors(prev => ({
			...prev,
			user: false
		}));
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);

		setErrors(prev => ({
			...prev,
			password: false
		}));
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		const validationErrors = {
			user: !user.trim(),
			password: !password
		};

		setErrors(validationErrors);

		if (validationErrors.user || validationErrors.password) {
			if (validationErrors.user) {
				userRef.current?.focus();
			} else {
				passwordRef.current?.focus();
			}

			return;
		}

		setLoading(true);

		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ user, password })
			});

			const data = await response.json();

			if (!response.ok) {
				setErrors({
					user: data.error === "user",
					password: data.error === "password"
				});

				errorToast(data.message || "Error al iniciar sesión.");

				if (data.error === "user") {
					userRef.current?.focus();
				} else if (data.error === "password") {
					passwordRef.current?.focus();
				}

				return;
			}

			handleUserLogin(data.token);

			successToast("Sesión iniciada con éxito");
			navigate("/home");

		} catch (error) {
			errorToast("No se pudo conectar con el servidor. Intentá nuevamente.");
			console.error(error);

		} finally {
			setLoading(false);
		}
	};

	const handleRegistrer = () => {
		navigate("/register");
	};

	return (
		<div className={styles.loginPage}>
			<Card className={styles.loginCard}>
				<Card.Body className={styles.loginBody}>

					<div className={styles.header}>
						<span className={styles.eyebrow}>
							VIEJO RABID
						</span>

						<Card.Title className={styles.title}>
							Bienvenido
						</Card.Title>

						<p className={styles.subtitle}>
							Ingresá a tu cuenta para continuar.
						</p>
					</div>

					<Form onSubmit={handleLogin} noValidate>

						<GenericForm
							id="user"
							text="Usuario"
							type="text"
							placeholder="Ingresar usuario"
							inputRef={userRef}
							value={user}
							onChange={handleUserChange}
							error={errors.user ? 'Usuario incorrecto.' : ''}
							className={`${styles.field} ${errors.user ? styles.invalidField : ''}`}
						/>

						<GenericForm
							id="password"
							text="Contraseña"
							type="password"
							placeholder="Ingresar contraseña"
							inputRef={passwordRef}
							value={password}
							onChange={handlePasswordChange}
							error={errors.password ? 'Contraseña incorrecta.' : ''}
							className={`${styles.field} ${errors.password ? styles.invalidField : ''}`}
						/>

						<Button
							variant="secondary"
							type="submit"
							className={styles.submitButton}
							disabled={loading}
						>
							{loading ? 'Ingresando...' : 'Iniciar sesión'}
						</Button>

						<div className={styles.registerSection}>
							<p>¿Aún no tenés cuenta?</p>

							<Button
								variant="link"
								onClick={handleRegistrer}
								className={styles.registerButton}
							>
								Crear una cuenta
							</Button>
						</div>

					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Login;


