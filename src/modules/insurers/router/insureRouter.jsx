// InsureRouterStack.js
import { BranchDetailPage } from "../pages/BranchDetailPage.jsx";
import { InsureDetailPage } from "../pages/InsureDetailPage.jsx";
import { InsuresPage } from "../pages/InsurersPage.jsx";

export const InsureRouterStack = {
	path: "aseguradoras",
	children: [
		{
			index: true,
			element: <InsuresPage />,
		},
		{
			path: ":insurerId",
			element: <InsureDetailPage />,
		},
		{
			path: ":insurerId/branch/:branchId",
			element: <BranchDetailPage />,
		},
	],
};
