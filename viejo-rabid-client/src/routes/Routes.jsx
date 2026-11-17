import { BrowserRouter, Routes, Route } from "react-router";

import Home from "../components/shared/home/Home";
import Login from "../components/shared/login/Login";
import Register from "../components/shared/login/Register";

import Dashboard from "../components/super-admin/dashboard/Dashboard";
import DashboardView from "../components/super-admin/dashboard/views/DashboardView";
import ProductsView from "../components/super-admin/dashboard/views/ProductsView";
import SuppliersView from "../components/super-admin/dashboard/views/SuppliersView";
import PurchasesView from "../components/super-admin/dashboard/views/PurchasesView";

import LayoutDefiner from "../components/super-admin/layout-definer/LayoutDefiner";
import SalesView from "../components/admin/SalesView";

import UserView from "../components/user/UserView";
import NotFound from "../components/shared/notFound/NotFound";

import RoleGuard from "../components/shared/auth/RoleGuard";
import Protected from "../components/shared/auth/Protected";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas generales */}
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Perfil: todos los roles */}
				<Route
					path="/client"
					element={
						<Protected>
							<RoleGuard>
								<UserView />
							</RoleGuard>
						</Protected>
					}
				/>

				{/* Ventas: admin y superadmin */}
				<Route
					path="/sales"
					element={
						<Protected>
							<RoleGuard>
								<SalesView />
							</RoleGuard>
						</Protected>
					}
				/>

				{/* Dashboard y sus secciones: superadmin */}
				<Route
					path="/dashboard"
					element={
						<Protected>
							<RoleGuard>
								<Dashboard />
							</RoleGuard>
						</Protected>
					}
				>
					<Route index element={<DashboardView />} />
					<Route path="products" element={<ProductsView />} />
					<Route path="suppliers" element={<SuppliersView />} />
					<Route path="purchases" element={<PurchasesView />} />
				</Route>

				{/* LayoutDef: superadmin */}
				<Route
					path="/layoutdef"
					element={
						<Protected>
							<RoleGuard>
								<LayoutDefiner />
							</RoleGuard>
						</Protected>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;