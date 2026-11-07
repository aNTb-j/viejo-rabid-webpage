import { Dropdown } from "react-bootstrap";

const ProfileDropdown = () => {

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="outline-secondary"
                id="profile-dropdown">
                <i className="bi bi-person-circle" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/login">
                    Cerrar sesión
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;