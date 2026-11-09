
import { useEffect, useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ThemeToggle from '../../services/theme/ThemeToggle';
import ProfileDropdown from '../profile/ProfileDropdown';
import RoleGuard from '../auth/RoleGuard';

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
				setHidden(true);
			} else if (difference < -5) {
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
		<Navbar expand="lg" className={`${styles.navbar} ${hidden ? styles.hidden : ''}`}>
			<Navbar.Brand className={styles.brand} href="/home">
				<span className={styles.brandName}>VIEJO RABID</span>
				<span className={styles.brandSubtitle}>Estilo urbano</span>
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

					{/* Menú exclusivo para admin y superadmin */}
					<RoleGuard allowedRoles={['admin', 'superadmin']}>
						<NavDropdown
							title={
								<span className={styles.menuButton}>
									<span>Menú</span>
									<i className={styles.menuArrow}></i>
								</span>
							}
							id="main-nav-dropdown"
							className={styles.menuDropdown}>
								
							<NavDropdown.Item href="/sales">
								Cargar venta
							</NavDropdown.Item>

							<RoleGuard allowedRoles={['superadmin']}>
								<NavDropdown.Divider />

								<NavDropdown.Item href="/dashboard">
									Dashboard
								</NavDropdown.Item>

								<NavDropdown.Item href="/layoutdef">
									Layout Definer
								</NavDropdown.Item>
							</RoleGuard>
						</NavDropdown>
					</RoleGuard>

					{/* Disponible para todos los usuarios */}
					<ThemeToggle />

				</Nav>

			</Navbar.Collapse>

			<ProfileDropdown />

		</Navbar>
	);
};

export default NavBar;
