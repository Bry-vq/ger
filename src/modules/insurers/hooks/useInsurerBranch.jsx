import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addInsurerBranchService,
	getInsurerBranchesService,
	getInsurerBranchService,
} from "../services/insurerBranchesServices.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useInsurerBranches = (insurerId, branchId) => {
	const { data: branches, isFetching: isBranchesFetching } = useQuery({
		queryKey: [QUERY_KEYS.BRANCHES, insurerId],
		queryFn: () => getInsurerBranchesService(insurerId),
		enabled: !!insurerId,
	});

	const { data: branch, isFetching: isBranchFetching } = useQuery({
		queryKey: [QUERY_KEYS.BRANCH, branchId],
		queryFn: () => getInsurerBranchService(branchId),
		enabled: !!branchId,
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
		branch,
		branches,
		isBranchesFetching,
		addBranch,
	};
};
