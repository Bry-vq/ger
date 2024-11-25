import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";
import { router } from "./router/mainRouter.jsx";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient.js";

function App() {
	return (
		<QueryClientProvider client={queryClient()}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
