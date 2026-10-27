import { useState } from 'react';
import { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavBar from '../../shared/navbar/NavBar.jsx';
import Sidebar from './Sidebar.jsx';

import DashboardView from './views/DashboardView.jsx';
import ProductsView from './views/ProductsView.jsx';
import SuppliersView from './views/SuppliersView.jsx';
import PurchasesView from './views/PurchasesView.jsx';

// React Bootstrap Off-Canvas

const Dashboard = () => {

	const [section, setSection] = useState('dashboard');

	return (
		<Fragment>

			<NavBar />

			<Container fluid>
				<Row>

					{/* Lugar para la sidebar*/}
					<Col xs={2}>
						<Sidebar setSection={setSection} />
					</Col>

					{/* Cuadricula de contenido */}
					<Col xs={10}>
						{section === 'home' && <DashboardView />}
						{section === 'products' && <ProductsView />}
						{section === 'suppliers' && <SuppliersView />}
						{section === 'purchases' && <PurchasesView />}
					</Col>

				</Row>
			</Container>

		</Fragment>
	);
};

export default Dashboard;