import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Button, Toast } from 'react-bootstrap';;

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

	const navigate = useNavigate();

	const handleRegister = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setErrors({
				passwordMatch: true
			});
			return;
		}

		console.log(email)

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
                    >
                        Crear mi cuenta
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
	);
};

export default Register;
