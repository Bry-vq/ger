import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { getInsurerService } from "../services/insurersServices.js";

export const useInsurer = (insurerId) => {
	const { data: insurer, isFetching: isInsurerFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSURER, insurerId],
		queryFn: () => getInsurerService(insurerId),
		enabled: !!insurerId,
	});

	return {
		insurer,
		isInsurerFetching,
	};
};
