import { InspectionPage } from "../page/InspectionPage.jsx";
export const InspectionRouterStack = {
	path: "inspecciones",
	children: [
		{
			index: true,
			element: <InspectionPage />,
		},
	],
};
