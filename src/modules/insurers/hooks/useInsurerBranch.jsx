import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addInsurerBranchService,
	getInsurerBranchesService,
} from "../services/insurerBranchesServices.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useInsurerBranches = (insurerId) => {
	const { data: branches, isFetching: isBranchesFetching } = useQuery({
		queryKey: [QUERY_KEYS.BRANCHES, insurerId],
		queryFn: () => getInsurerBranchesService(insurerId),
	});

	const { mutateAsync: addBranch } = useMutation({
		mutationFn: addInsurerBranchService,
		queryKey: [QUERY_KEYS.BRANCHES],
		onSuccess: () => {
			queryClient().invalidateQueries(QUERY_KEYS.BRANCHES);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		branches,
		isBranchesFetching,
		addBranch,
	};
};
