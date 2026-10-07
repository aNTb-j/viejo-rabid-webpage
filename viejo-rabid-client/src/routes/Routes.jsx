import {
	BrowserRouter,
	Routes,
	Route
} from "react-router";

import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Dashboard from "../components/dashboard/Dashboard";

import NotFound from "../components/sheared/notFound/NotFound";

const Router = () => {
	return (
		<BrowserRouter>

			<Routes>

				<Route
					path="/login"
					element={<Login />}
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
					path="*"
					element={<NotFound />}
				/>

			</Routes>

		</BrowserRouter>
	);
};

export default Router;