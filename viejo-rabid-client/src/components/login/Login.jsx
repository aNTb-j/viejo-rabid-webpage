
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

import "./Login.css";

const Login = ({ loggedInFlag }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState({ email: false, password: false });

	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setErrors({ ...errors, email: false });
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setErrors({ ...errors, password: false });
	};

	const handleLogin = (event) => {
		event.preventDefault();

		// Validar email
		if (!emailRef.current.value.length) {
			setErrors({ ...errors, email: true });
			const errorText = "El mail debe contener @";
			emailRef.current.focus();
			return errorText;
		}

		// Validar password
		if (!password.length || password.length < 7) {
			setErrors({ ...errors, password: true });
			const errorText = "El password debe tener al menos 7 caracteres";
			passwordRef.current.focus();
			return errorText;
		}

		// No hay errores

		setErrors({ email: false, password: false });
		loggedInFlag()
		navigate("/movies")
	};

	// https://es.react.dev/reference/react-dom/components/input

	// onSubmit: la idea es que cuando el usuario envía el formulario, React ejecute una función.
	return (
		<section className="login-container">
			<Card className="login-card">
				<Form onSubmit={handleLogin}>
					<Form.Group className="mb-4">
						<Form.Control
							type="text"
							ref={emailRef}
							placeholder="Ingresar mail"
							onChange={handleEmailChange}
							value={email}
							className={errors.email ? "border border-danger" : ""} />
					</Form.Group>
					<p>{errors.email ? "Error en la email" : ""}</p>
					<Form.Group className="mb-4">
						<Form.Control
							type="password"
							ref={passwordRef}
							placeholder="Ingresar password"
							onChange={handlePasswordChange}
							value={password}
							className={errors.password ? "border border-danger" : ""} />
					</Form.Group>
					<p>{errors.password ? "Error en la constraseña" : ""}</p>
					<p>{errors.email ? "Error en la email" : errors.password ? "Error en la constraseña" : ""}</p>
					<Button type="submit">
						Ingresar
					</Button>
				</Form>
			</Card>
		</section>

	)
}

export default Login;
