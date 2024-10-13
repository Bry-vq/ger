import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";
import { router } from "./router/mainRouter.jsx";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
