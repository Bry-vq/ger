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
			// element: <InsuredPage />,
		},
	],
};
