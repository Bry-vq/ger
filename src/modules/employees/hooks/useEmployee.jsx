import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import {
	addEmployeeService,
	getEmployeesService,
	updateEmployeeService,
} from "../services/employeesServices.jsx";
import { queryClient } from "../../../utils/queryClient.js";

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

	const { mutateAsync: updateEmployee } = useMutation({
		mutationFn: updateEmployeeService,
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
		updateEmployee,
	};
};
