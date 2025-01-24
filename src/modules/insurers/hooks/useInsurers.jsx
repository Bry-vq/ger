import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addInsurerService,
	getInsurerService,
	getInsurersService,
	updateInsurerService,
} from "../services/insurersServices.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useInsurer = (insurerId) => {
	const { data: insures, isFetching: isInsuresFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSURES],
		queryFn: getInsurersService,
	});

	const { data: insurer, isFetching: isInsurerFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSURER, insurerId],
		queryFn: () => getInsurerService(insurerId),
		enabled: !!insurerId,
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

	const { mutateAsync: updateInsurer } = useMutation({
		mutationFn: updateInsurerService,
		queryKey: [QUERY_KEYS.INSURES],
		onSuccess: () => {
			queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.INSURES],
			});
			queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.INSURER, insurerId],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});
	return {
		insurer,
		isInsurerFetching,
		insures,
		isInsuresFetching,
		addInsurer,
		updateInsurer,
	};
};
