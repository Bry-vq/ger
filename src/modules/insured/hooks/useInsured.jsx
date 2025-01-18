import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { queryClient } from "../../../utils/queryClient.js";
import {
	addInsuredBranchService,
	addInsuredService,
	getInsuredBranchesService,
	getInsuredService,
	getInsuredsService,
} from "../services/insuredServices.js";

export const useInsured = (insuredId) => {
	const { data: insureds, isFetching: isInsuredsFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSUREDS],
		queryFn: getInsuredsService,
	});

	const { data: insured, isFetching: isInsuredFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSURED, insuredId],
		queryFn: () => getInsuredService(insuredId),
		enabled: !!insuredId,
	});

	const { data: insuredBranches, isFetching: isInsuredBranchesFetching } =
		useQuery({
			queryKey: [QUERY_KEYS.INSURED_BRANCHES, insuredId],
			queryFn: () => getInsuredBranchesService(insuredId),
			enabled: !!insuredId,
		});

	const { mutateAsync: addInsured } = useMutation({
		mutationFn: addInsuredService,
		queryKey: [QUERY_KEYS.INSUREDS],
		onSuccess: () => queryClient().invalidateQueries(QUERY_KEYS.INSUREDS),
		onError: (error) => {
			console.error(error);
		},
	});

	const { mutateAsync: addInsuredBranch } = useMutation({
		mutationFn: addInsuredBranchService,
		queryKey: [QUERY_KEYS.INSURED_BRANCHES, insuredId],
		onSuccess: () =>
			queryClient().invalidateQueries([QUERY_KEYS.INSURED_BRANCHES, insuredId]),
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		insured,
		insureds,
		insuredBranches,
		isInsuredsFetching,
		addInsured,
		addInsuredBranch,
	};
};
