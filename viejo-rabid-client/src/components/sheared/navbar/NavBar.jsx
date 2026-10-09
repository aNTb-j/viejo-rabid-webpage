
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from './NavBar.module.css';

const NavBar = () => {
	return (
		<Navbar expand="lg" className={styles.navbar}>

			<Navbar.Brand className={styles.brand} href="/home">
				Viejo Rabid
			</Navbar.Brand>

			<Navbar.Toggle
				className={styles.toggle}
				aria-controls="basic-navbar-nav" />

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link
						className={styles.link}
						href="/home">
						Home
					</Nav.Link>
					<NavDropdown
						className={styles.dropdown}
						title="Menu"
						id="basic-nav-dropdown">

						<NavDropdown.Item href="#action/3.3">
							Cargar Venta
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