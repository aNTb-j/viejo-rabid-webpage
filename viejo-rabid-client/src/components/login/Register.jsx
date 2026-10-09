import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Button, Row, Col, Toast } from 'react-bootstrap';;


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

	const navigate = useNavigate();

	const handleRegister = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setErrors({
				passwordMatch: true
			});
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					user,
					password,
					dni: Number(dni),
					username,
					surname,
					email,
					birthdate,
					phone_number: phoneNumber
				})
			});

			// Leer la respuesta como texto para inspeccionarla
			const text = await response.text();

			console.log("Estado HTTP:", response.status);
			console.log("Respuesta del servidor:", text);

			// Intentar interpretar el JSON
			const data = JSON.parse(text);
			if (!response.ok) {
				throw new Error(data.message || "Error al registrar el usuario");
			}

			Toast("Usuario creado correctamente");
			navigate("/login");

		} catch (error) {
			console.error("Error en el registro:", error);
		}
	};


	return (
		<Card className="login-card">
			<Card.Body>
				<Card.Title className="mb-4">
					Crear cuenta
				</Card.Title>

				<Form onSubmit={handleRegister} noValidate>

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
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

					<Form.Group className="mb-3">
						<Form.Control
							type="password"
							placeholder="Ingresar contraseña"
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

					<Form.Group className="mb-4">
						<Form.Control
							type="password"
							placeholder="Confirmar contraseña"
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

					<Row>
						<Col>
							<Button
								variant="secondary"
								type="submit"
								className="w-100"
							>
								Registrarme
							</Button>
						</Col>
					</Row>

				</Form>
			</Card.Body>
		</Card>
	);
};

export default Register;

