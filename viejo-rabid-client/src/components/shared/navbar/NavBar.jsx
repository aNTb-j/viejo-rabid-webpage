
import { useEffect, useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from '../../../styles/components/navbar.module.scss';

const NavBar = () => {
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const difference = currentScrollY - lastScrollY;

			if (currentScrollY <= 80) {
				setHidden(false);
			} else if (difference > 5) {
				// Bajando: ocultar navbar.
				setHidden(true);
			} else if (difference < -5) {
				// Subiendo: mostrar navbar.
				setHidden(false);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Navbar
			expand="lg"
			className={`${styles.navbar} ${hidden ? styles.hidden : ''}`}
		>
			<Navbar.Brand className={styles.brand} href="/home">
				<span className={styles.brandName}>VIEJO RABID</span>
				<span className={styles.brandSubtitle}>Estilo cotidiano</span>
			</Navbar.Brand>

			<Navbar.Toggle
				className={styles.toggle}
				aria-controls="main-navbar"
				aria-label="Abrir o cerrar menú"
			/>

			<Navbar.Collapse id="main-navbar" className={styles.collapse}>
				<Nav className={styles.left}>
					<Nav.Link className={styles.link} href="/home">
						Inicio
					</Nav.Link>
				</Nav>

				<Nav className={styles.right}>
					<NavDropdown
						className={styles.dropdown}
						title="Menú"
						id="main-nav-dropdown"
						align="end"
					>
						<NavDropdown.Item href="#action/3.3">
							Cargar venta
						</NavDropdown.Item>

						<NavDropdown.Divider />

						<NavDropdown.Item href="/dashboard">
							Dashboard
						</NavDropdown.Item>

						<NavDropdown.Item href="/layoutdef">
							Layout Definer
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
