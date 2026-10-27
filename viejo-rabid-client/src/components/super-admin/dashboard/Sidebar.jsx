import { useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import styles from './Sidebar.module.css';

import { HomeIcon, ProductIcon, StockIcon, PurchasesIcon, SalesIcon }from './utils/SideBarIcons.jsx';

const Sidebar = ({ setSection }) => {
	const [sidebarState, setSidebarState] = useState('expanded');

	const isCollapsed = sidebarState === 'collapsed';

	const menuItems = [
		{ id: 'home', label: 'Inicio', Icon: HomeIcon },
		{ id: 'products', label: 'Productos', Icon: ProductIcon },
		{ id: 'suppliers', label: 'Proveedores', Icon: StockIcon },
		{ id: 'purchases', label: 'Compras', Icon: PurchasesIcon },
		{ id: 'sales', label: 'Ventas', Icon: SalesIcon },
		{ id: 'expenses', label: 'Gastos', Icon: SalesIcon },
	];

	function handleSidebarState() {
		setSidebarState((current) =>
			current === 'expanded' ? 'collapsed' : 'expanded'
		);
	}

	return (
		<aside
			className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
			<div className={styles.header}>
				{!isCollapsed && (
					<h4 className={styles.title}>Viejo Rabid</h4>
				)}

				<Button
					variant="light"
					className={styles.toggleButton}
					onClick={handleSidebarState}
					aria-label={
						isCollapsed
							? 'Expandir menu'
							: 'Contraer menu'
					}
					aria-expanded={!isCollapsed}
				>
					{isCollapsed ? '»' : '«'}
				</Button>
			</div>

			<Nav className={styles.nav}>
				{menuItems.map(({ id, label, Icon }) => (
					<Nav.Link
						key={id}
						onClick={() => setSection(id)}
						className={styles.sidebarLink}
						title={isCollapsed ? label : undefined}
						aria-label={label}
					>
						<Icon size={24} />

						{!isCollapsed && (
							<span className={styles.linkText}>
								{label}
							</span>
						)}
					</Nav.Link>
				))}
			</Nav>
		</aside>
	);
};

export default Sidebar;