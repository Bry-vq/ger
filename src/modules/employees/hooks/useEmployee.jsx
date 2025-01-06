import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addEmployeeService,
	getEmployeesService,
} from "../services/employeesServices.jsx";

export const useEmployee = () => {
	const { data: employees, isFetching: isEmployeesFetching } = useQuery({
		queryKey: [QUERY_KEYS.EMPLOYEES],
		queryFn: getEmployeesService,
	});

	const { mutateAsync: addEmployee } = useMutation({
		mutationFn: addEmployeeService,
		queryKey: [QUERY_KEYS.EMPLOYEES],
		onSuccess: () => {
			queryClient().invalidateQueries({
				queryKey: [QUERY_KEYS.EMPLOYEES],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return {
		employees,
		isEmployeesFetching,
		addEmployee,
	};
};
