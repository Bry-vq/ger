import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../utils/queryClient.js";
import {
	addInspectionService,
	getInspectionsService,
} from "../services/inspectionServices.js";
import { QUERY_KEYS } from "../../../utils/constanst.js";

export const useInspection = () => {
	const { data: inspections, isFetching: isInspectionsFetching } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS],
		queryFn: getInspectionsService,
	});

	const { mutate: addInspection } = useMutation({
		mutationFn: addInspectionService,
		onSuccess: () => {
			queryClient().invalidateQueries(QUERY_KEYS.INSPECTIONS);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		inspections,
		isInspectionsFetching,
		addInspection,
	};
};
