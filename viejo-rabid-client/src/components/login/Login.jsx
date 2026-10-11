
/*
https://es.react.dev/reference/rules/rules-of-hooks

https://es.react.dev/reference/react/useRef

https://es.react.dev/learn/referencing-values-with-refs


https://es.react.dev/learn/responding-to-events

https://es.react.dev/learn/adding-interactivity
*/

import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import styles from './Login.module.css'

const Login = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState({ user: false, password: false });

	const userRef = useRef(null);
	const passwordRef = useRef(null);

	const navigate = useNavigate();

	const handleUserChange = (event) => {
		setUser(event.target.value);
		setErrors({ ...errors, user: false });
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setErrors({ ...errors, password: false });
	};

	const handleLogin = (event) => {
		event.preventDefault();

		setErrors({ user: false, password: false });
		navigate("/home")
	};

	const handleRegistrer = () => {
		navigate("/register")

	};


	return (
		<div className={styles.loginPage}>
			<Card className={styles.loginCard}>
				<Card.Body className={styles.loginBody}>
					<div className={styles.header}>
						<span className={styles.eyebrow}>VIEJO RABID</span>

						<Card.Title className={styles.title}>
							Bienvenido
						</Card.Title>

						<p className={styles.subtitle}>
							Ingresá a tu cuenta para continuar.
						</p>
					</div>

					<Form onSubmit={handleLogin} noValidate>
						<Form.Group className={styles.field}>
							<Form.Label>Usuario</Form.Label>

							<Form.Control
								type="text"
								ref={userRef}
								placeholder="Ingresar usuario"
								onChange={handleUserChange}
								value={user}
								isInvalid={!!errors.user}
							/>

							<Form.Control.Feedback type="invalid">
								Debe ingresar un usuario.
							</Form.Control.Feedback>
						</Form.Group>

						{errors.email && (
							<p className={styles.errorMessage}>
								Error en el email.
							</p>
						)}

						<Form.Group className={styles.field}>
							<Form.Label>Contraseña</Form.Label>

							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Ingresar contraseña"
								onChange={handlePasswordChange}
								value={password}
								isInvalid={!!errors.password}
							/>

							<Form.Control.Feedback type="invalid">
								Debe ingresar una contraseña.
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							variant="secondary"
							type="submit"
							className={styles.submitButton}
						>
							Iniciar sesión
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


}

export default Login;

