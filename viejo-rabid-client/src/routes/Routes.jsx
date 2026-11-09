import {
	BrowserRouter,
	Routes,
	Route
} from "react-router";

import Home from "../components/shared/home/Home";
import Login from "../components/shared/login/Login";
import Register from "../components/shared/login/Register";
import Dashboard from "../components/super-admin/dashboard/Dashboard";
import LayoutDefiner from "../components/super-admin/layout-definer/LayoutDefiner";
import SalesView from "../components/admin/SalesView";

import UserView from "../components/user/UserView";

import NotFound from "../components/shared/notFound/NotFound";
import RoleGuard from "../components/shared/auth/RoleGuard";

const Router = () => {

	return (
		<BrowserRouter>
			<Routes>

				{/* Rutas generales */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/client" element={<UserView />} />

				{/* admin y superadmin*/}
				<Route
					path="/sales"
					element={
						<RoleGuard allowedRoles={['admin', 'superadmin']}>
							<SalesView />
						</RoleGuard>
					}
				/>

				{/* Solamente superadmin */}
				<Route
					path="/dashboard"
					element={
						<RoleGuard allowedRoles={['superadmin']}>
							<Dashboard />
						</RoleGuard>
					}
				/>

				<Route
					path="/layoutdef"
					element={
						<RoleGuard allowedRoles={['superadmin']}>
							<LayoutDefiner />
						</RoleGuard>
					}
				/>

				<Route path="*" element={<NotFound />} />

			</Routes>
		</BrowserRouter>
	);
};

export default Router;