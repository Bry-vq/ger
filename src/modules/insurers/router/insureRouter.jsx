import { BranchDetailPage } from "../pages/BranchDetailPage.jsx";
import { InsurerDetailPage } from "../pages/InsurerDetailPage.jsx";
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
			element: <InsurerDetailPage />,
		},
		{
			path: ":insurerId/sucursal/:branchId",
			element: <BranchDetailPage />,
		},
	],
};
