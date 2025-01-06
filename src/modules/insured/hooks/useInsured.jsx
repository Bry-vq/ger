import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { queryClient } from "../../../utils/queryClient.js";
import {
	addInsuredService,
	getInsuredsService,
} from "../services/insuredServices.js";

export const useInsured = () => {
	const { data: insureds, isFetching: isInsuredsFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSUREDS],
		queryFn: getInsuredsService,
	});

	const { mutateAsync: addInsured } = useMutation({
		mutationFn: addInsuredService,
		queryKey: [QUERY_KEYS.INSUREDS],
		onSuccess: () => queryClient().invalidateQueries(QUERY_KEYS.INSUREDS),
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		insureds,
		isInsuredsFetching,
		addInsured,
	};
};
