import { QueryClient } from "@tanstack/react-query";

let queryClientinstance = null;
export const queryClient = () => {
	if (!queryClientinstance) {
		queryClientinstance = new QueryClient({
			defaultOptions: {
				queries: {
					retry: 1,
					refetchOnWindowFocus: false,
					refetchOnMount: false,
				},
			},
		});
	}
	return queryClientinstance;
};
