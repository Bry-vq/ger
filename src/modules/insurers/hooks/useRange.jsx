import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { queryClient } from "../../../utils/queryClient.js";
import {
	addInsurabilityRangeService,
	getInsurabilityRangesService,
	updateInsurabilityRangeService,
} from "../services/rangesServices.js";

export const useRange = (insurerId) => {
	const { data: ranges, isFetching: isRangesFetching } = useQuery({
		queryKey: [QUERY_KEYS.RANGES, insurerId],
		queryFn: () => getInsurabilityRangesService(insurerId),
		enabled: !!insurerId,
	});

	const { mutateAsync: addRange } = useMutation({
		mutationFn: addInsurabilityRangeService,
		queryKey: [QUERY_KEYS.RANGES],
		onSuccess: async () => {
			await queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.RANGES],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const { mutateAsync: updateRange } = useMutation({
		mutationFn: updateInsurabilityRangeService,
		queryKey: [QUERY_KEYS.RANGES],
		onSuccess: async () => {
			await queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.RANGES],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		ranges,
		isRangesFetching,
		addRange,
		updateRange,
	};
};
