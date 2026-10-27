
/*
https://es.react.dev/reference/rules/rules-of-hooks

https://es.react.dev/reference/react/useRef

https://es.react.dev/learn/referencing-values-with-refs


https://es.react.dev/learn/responding-to-events

https://es.react.dev/learn/adding-interactivity
*/

import { useContext, useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { GenericForm } from '../forms/GenericForm';

import { useNavigate } from 'react-router';

import { AuthenticationContext } from '../auth/auth.context';
import { errorToast, successToast } from "../../shared/toast/toast";

import styles from './Login.module.css'

const Login = () => {
	const { handleUserLogin } = useContext(AuthenticationContext)

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

		let data = {
			user,
			password
		}

		setErrors({ user: false, password: false });

		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data)
		})
			.then(res => {
				if (!res.ok)
					return res.json().then(data => {
						errorToast(data.message);
						throw new Error(data.message);
					});

				return res.json();
			})
			.then(res => {
				setErrors({ email: false, password: false });
				handleUserLogin(res.token);
				successToast("Sesion iniciada con exito")
				navigate("/home");

			})
			.catch(err => console.log(err))

	};

	const handleRegistrer = () => {
		navigate("/register")
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
							label="Usuario"
							type="text"
							placeholder="Ingresar usuario"
							inputRef={userRef}
							value={user}
							onChange={handleUserChange}
							error={errors.user ? 'Debe ingresar un usuario.' : ''}
							className={styles.field}
						/>

						<GenericForm
							id="password"
							label="Contraseña"
							type="password"
							placeholder="Ingresar contraseña"
							inputRef={passwordRef}
							value={password}
							onChange={handlePasswordChange}
							error={errors.password ? 'Debe ingresar una contraseña.' : ''}
							className={styles.field}
						/>

						<Button variant="secondary" type="submit" className={styles.submitButton}>
							Iniciar sesión
						</Button>

						<div className={styles.registerSection}>
							<p>¿Aún no tenés cuenta?</p>

							<Button	variant="link" onClick={handleRegistrer} className={styles.registerButton}>
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

