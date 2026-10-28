
import { useState } from 'react';

import NavBar from '../../shared/navbar/NavBar.jsx';
import Sidebar from './Sidebar.jsx';

import DashboardView from './views/DashboardView.jsx';
import ProductsView from './views/ProductsView.jsx';
import SuppliersView from './views/SuppliersView.jsx';
import PurchasesView from './views/PurchasesView.jsx';

import styles from '../../../styles/components/dashboard.module.scss';

const Dashboard = () => {
  const [section, setSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (section) {
      case 'home':
        return <DashboardView />;

      case 'products':
        return <ProductsView />;

      case 'suppliers':
        return <SuppliersView />;

      case 'purchases':
        return <PurchasesView />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <NavBar />

      <div className={styles.layout}>
        <Sidebar
          activeSection={section}
          setSection={setSection}
          isCollapsed={sidebarCollapsed}
          onToggleCollapsed={() =>
            setSidebarCollapsed((current) => !current)
          }
        />

        <main className={styles.content}>
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
