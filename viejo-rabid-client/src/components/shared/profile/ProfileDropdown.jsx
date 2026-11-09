import { Dropdown } from "react-bootstrap";
import styles from '../../../styles/components/profiledropdown.module.scss';

const ProfileDropdown = () => {

	return (
		<Dropdown align="end" className={styles.profileDropdown}>
			<Dropdown.Toggle
				id="profile-dropdown"
				className={styles.profileButton}
				aria-label="Abrir perfil"
			>
				<i className="bi bi-person-circle" />
			</Dropdown.Toggle>

			<Dropdown.Menu className={styles.profileMenu}>
				<Dropdown.Item href="/client">
					<i className="bi bi-box-arrow-right" />
					<span>Perfil</span>
				</Dropdown.Item>
				<Dropdown.Item href="/login">
					<i className="bi bi-box-arrow-right" />
					<span>Cerrar sesión</span>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ProfileDropdown;