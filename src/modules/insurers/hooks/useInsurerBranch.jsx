import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { getInsurerBranchesService } from "../services/insurerBranchesServices.js";

export const useInsurerBranches = (insurerId) => {
	// const { data: insurer, isFetching: isInsurerFetching } = useQuery({
	// 	queryKey: [QUERY_KEYS.INSURER, insurerId],
	// 	queryFn: () => getInsurerService(insurerId),
	// 	enabled: !!insurerId,
	// });

	const { data: branches, isFetching: isBranchesFetching } = useQuery({
		queryKey: [QUERY_KEYS.BRANCHES],
		queryFn: () => getInsurerBranchesService(insurerId),
	});

	return {
		branches,
		isBranchesFetching,
	};
};
