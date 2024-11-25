import { useMutation, useQuery } from "@tanstack/react-query";
import {
	addRiskTypeService,
	getRiskTypesService,
} from "../services/riskTypeServices.js";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useRiskType = (insurerId) => {
	const { data: riskTypes, isFetching: isRiskTypesFetching } = useQuery({
		queryKey: [QUERY_KEYS.RISK_TYPE, insurerId],
		queryFn: () => getRiskTypesService(insurerId),
		enabled: !!insurerId,
	});

	const { mutateAsync: addRisk } = useMutation({
		mutationFn: addRiskTypeService,
		queryKey: [QUERY_KEYS.RISK_TYPE],
		onSuccess: async () => {
			await queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.RISK_TYPE],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		addRisk,
		riskTypes,
		isRiskTypesFetching,
	};
};
