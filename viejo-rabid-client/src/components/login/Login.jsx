
/*
https://es.react.dev/reference/rules/rules-of-hooks

https://es.react.dev/reference/react/useRef

https://es.react.dev/learn/referencing-values-with-refs


https://es.react.dev/learn/responding-to-events

https://es.react.dev/learn/adding-interactivity
*/

import { useRef, useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
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
		<>
			<Card className={styles.loginCard}>
				<Form onSubmit={handleLogin}>
					<Form.Group className="mb-4">
						<Form.Control
							type="text"
							ref={userRef}
							placeholder="Ingresar Usuario"
							onChange={handleUserChange}
							value={user}
							className={errors.email && "border border-danger"} />
						{errors.user && <p className="mt-2 text-danger">Debe ingresar un usuario</p>}
					</Form.Group>
					<p>{errors.email ? "Error en la email" : ""}</p>
					<Form.Group className="mb-4">
						<Form.Control
							type="password"
							ref={passwordRef}
							placeholder="Ingresar password"
							onChange={handlePasswordChange}
							value={password}
							className={errors.password && "border border-danger"} />
						{errors.password && <p className="mt-2 text-danger">Debe ingresar una contraseña</p>}
					</Form.Group>
					<Row>
						<Col />
						<Col md={6} className="">
							<Button variant='secondary' type='submit'>
								Iniciar Secion
							</Button>
						</Col>
					</Row>

					<Row className='mt-4'>
						<p className=''>¿Aun no tienes cuenta?</p>
						<Button onClick={handleRegistrer}>Registrate</Button>
					</Row>
				</Form>
			</Card>
		</>
	)
}

export default Login;
