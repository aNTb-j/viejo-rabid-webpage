import { useState } from "react";

import SupplierForm from "./supplier-utils/SupplierForm";
import SuppliersTable from "./supplier-utils/SupplierTable";

const SuppliersView = () => {

	const [refreshKey, setRefreshKey] = useState(0);

	const handleSupplierCreated = () => {
		setRefreshKey(prev => prev + 1);
	};

	return (
		<div>
			<SupplierForm onSupplierCreated={handleSupplierCreated} />
			<SuppliersTable refreshKey={refreshKey} />
		</div>
	);
};

export default SuppliersView;