import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import NavBar from '../../shared/navbar/NavBar.jsx';
import Sidebar from './Sidebar.jsx';

import styles from '../../../styles/components/dashboard.module.scss';

const Dashboard = () => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const section = location.pathname.split('/')[2] || 'home';

	const handleSectionChange = (newSection) => {
		const path = newSection === 'home'
			? '/dashboard'
			: `/dashboard/${newSection}`;

		navigate(path);
	};

	return (
		<div className={styles.dashboard}>
			<NavBar />

			<div className={styles.layout}>
				<Sidebar
					activeSection={section}
					setSection={handleSectionChange}
					isCollapsed={sidebarCollapsed}
					onToggleCollapsed={() =>
						setSidebarCollapsed(current => !current)
					}
				/>

				<main className={styles.content}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;