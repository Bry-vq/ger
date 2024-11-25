import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addInsurerService,
	getInsurersService,
} from "../services/insurersServices.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useInsurers = () => {
	const { data: insures, isFetching: isInsuresFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSURES],
		queryFn: getInsurersService,
	});

	const { mutateAsync: addInsurer } = useMutation({
		mutationFn: addInsurerService,
		queryKey: [QUERY_KEYS.INSURES],
		onSuccess: () => {
			queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.INSURES],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});
	return {
		insures,
		isInsuresFetching,
		addInsurer,
	};
};
