import { useContext } from "react";
import { useNavigate } from "react-router";
import { Dropdown, Button } from "react-bootstrap";

import { AuthenticationContext } from "../../shared/auth/auth.context";
import styles from "../../../styles/components/profiledropdown.module.scss";

const ProfileDropdown = () => {
    const { token, handleUserLogout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    // Usuario no autenticado
    if (!token) {
        return (
            <Button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
            >
                Iniciar sesión
            </Button>
        );
    }

    // Usuario autenticado
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
                <Dropdown.Item onClick={() => navigate("/client")}>
                    <i className="bi bi-person" />
                    <span>Perfil</span>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleUserLogout}>
                    <i className="bi bi-box-arrow-right" />
                    <span>Cerrar sesión</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;