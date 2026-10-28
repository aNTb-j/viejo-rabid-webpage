import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import styles from '../../../styles/components/sidebar.module.scss';

import {
	HomeIcon,
	ProductIcon,
	StockIcon,
	PurchasesIcon,
	SalesIcon,
} from './utils/SideBarIcons.jsx';

const Sidebar = ({ setSection, activeSection, isCollapsed, onToggleCollapsed }) => {

	const menuItems = [
		{ id: 'home', label: 'Inicio', Icon: HomeIcon },
		{ id: 'products', label: 'Productos', Icon: ProductIcon },
		{ id: 'suppliers', label: 'Proveedores', Icon: StockIcon },
		{ id: 'purchases', label: 'Compras', Icon: PurchasesIcon },
		{ id: 'sales', label: 'Ventas', Icon: SalesIcon },
		{ id: 'expenses', label: 'Gastos', Icon: SalesIcon },
	];

	return (
		<aside
			className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''
				}`}
		>
			<div className={styles.header}>
				{!isCollapsed && (
					<h4 className={styles.title}>Viejo Rabid</h4>
				)}

				<Button
					variant="light"
					className={styles.toggleButton}
					onClick={onToggleCollapsed}
					aria-label={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
					aria-expanded={!isCollapsed}
				>
					{isCollapsed ? '»' : '«'}
				</Button>
			</div>

			<Nav className={styles.nav} aria-label="Navegación principal">
				{menuItems.map(({ id, label, Icon }) => {
					const isActive = activeSection === id;

					return (
						<Nav.Link
							key={id}
							onClick={() => setSection(id)}
							className={`${styles.sidebarLink} ${isActive ? styles.active : ''
								}`}
							title={isCollapsed ? label : undefined}
							aria-label={label}
							aria-current={isActive ? 'page' : undefined}
						>
							<Icon size={24} />

							{!isCollapsed && (
								<span className={styles.linkText}>
									{label}
								</span>
							)}
						</Nav.Link>
					);
				})}
			</Nav>
		</aside>
	);
};

export default Sidebar;
