import { createBrowserRouter, RouteObject } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SelectedTodo from "../pages/SelectedTodo";
import { userData } from "../store/user";

const useBrowserRouter = () => {
	const value = useRecoilValue(userData);

	const loggedInRoutes = [
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "",
					element: <Home />,
				},
				{
					path: "todos/:id",
					element: <SelectedTodo />,
				},
			],
		},
	];

	const loggedOutRoutes = [
		{
			path: "/",
			element: <Login />,
		},
	];

	const sharedRoutes: RouteObject[] = [];

	const router = createBrowserRouter([
		...(value ? loggedInRoutes : loggedOutRoutes),
		...sharedRoutes,
	]);

	return { router };
};

export default useBrowserRouter;
