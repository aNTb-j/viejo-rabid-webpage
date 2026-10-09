import { useState } from 'react';
import { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavBar from "../sheared/navbar/NavBar.jsx";
import Sidebar from './Sidebar.jsx';

import DashboardView from './views/DashboardView.jsx';
import ProductForm from './views/ProductForm.jsx';

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
						{section === 'products' && <ProductForm />}
					</Col>

				</Row>
			</Container>

		</Fragment>
	);
};

export default Dashboard;