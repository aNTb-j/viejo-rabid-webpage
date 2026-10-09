import { useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import styles from './Sidebar.module.css';


const Sidebar = ({ setSection  }) => {

	const [sidebarState, setSidebarState] = useState('hidden')

	function handleSidebarState() {
		sidebarState === 'hidden' ? setSidebarState("seen") : setSidebarState('hidden')
		console.log(sidebarState)
	};


	function handleBagininSection() {
		setSection('home');
	};

	function handleProductView() {
		setSection('products');
	};

	function handleStockstView() {
		setSection('stock');
	};

	function handlePurchasesView() {
		setSection('purchaces');
	};

	function handleSellstView() {
		setSection('sales');
	};

	return (
		<aside className={`${styles.sidebar} ${styles[sidebarState]}`}>
			<h4 className={styles.title}>SideBar
				<Button onClick={handleSidebarState}>
					H
				</Button>
			</h4>

			<Nav className="flex-column">
				
				<Nav.Link onClick={handleBagininSection}>Inicio</Nav.Link>
				<Nav.Link onClick={handleProductView}>Productos</Nav.Link>
				<Nav.Link onClick={handleStockstView}>Stock</Nav.Link>
				<Nav.Link onClick={handlePurchasesView}>Compras</Nav.Link>
				<Nav.Link onClick={handleSellstView}>Ventas</Nav.Link>
				
			</Nav>
		</aside>
	);
};

export default Sidebar;

