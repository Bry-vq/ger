import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addSupervisorService,
	getSupervisorsService,
} from "../services/SupervisorServices.js";
import { queryClient } from "../../../utils/queryClient.js";

export const useSupervisor = (branchId) => {
	const { data: supervisors, isFetching } = useQuery({
		queryKey: [QUERY_KEYS.SUPERVISORS, branchId],
		queryFn: () => getSupervisorsService(branchId),
		enabled: !!branchId,
	});

	const { mutateAsync: addSupervisor } = useMutation({
		mutationFn: addSupervisorService,
		queryKey: [QUERY_KEYS.SUPERVISORS],
		onSuccess: () => {
			queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.SUPERVISORS],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});
	return {
		supervisors,
		isFetching,
		addSupervisor,
	};
};
