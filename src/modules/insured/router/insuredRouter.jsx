import { InsuredDetailPage } from "../pages/InsuredDetailPage.jsx";
import { InsuredPage } from "../pages/InsuredPage.jsx";

export const InsuredRouterStack = {
	path: "asegurados",
	children: [
		{
			index: true,
			element: <InsuredPage />,
		},
		{
			path: ":insuredId",
			element: <InsuredDetailPage />,
		},
	],
};
