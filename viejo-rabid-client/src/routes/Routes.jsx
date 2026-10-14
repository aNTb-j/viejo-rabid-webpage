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

import NotFound from "../components/shared/notFound/NotFound";

const Router = () => {
	return (
		<BrowserRouter>

			<Routes>

				<Route
					path="/login"
					element={<Login />}
				/>

				<Route
					path="/register"
					element={<Register />}
				/>

				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>

				<Route
					path="/layoutdef"
					element={<LayoutDefiner />}
				/>


				<Route
					path="*"
					element={<NotFound />}
				/>

			</Routes>

		</BrowserRouter>
	);
};

export default Router;