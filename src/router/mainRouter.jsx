import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/index.jsx";
import { AuthRouterStack } from "../modules/auth/router/authRouter.jsx";
import { HomeRouterStack } from "../modules/home/router/HomeRouter.jsx";
import { InsureRouterStack } from "../modules/insurers/router/insureRouter.jsx";
import { InspectionRouterStack } from "../modules/inspection/router/inspectionRouter.jsx";

export const router = createBrowserRouter([
	// Private Routes
	{
		path: "/",
		element: <MainLayout />,
		children: [HomeRouterStack, InsureRouterStack, InspectionRouterStack],
	},
	// Public Rutes
	AuthRouterStack,
]);
