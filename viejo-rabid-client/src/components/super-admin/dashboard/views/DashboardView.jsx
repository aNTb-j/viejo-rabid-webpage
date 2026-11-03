import DashboardCharts from './dashboard-utils/DashboardCharts.jsx';

import styles from '../../../../styles/components/dashboard.module.scss';


const DashboardView = () => {
	return (
		<div className={styles.body}>
			<DashboardCharts/>
		</div>
	)
}

export default DashboardView;