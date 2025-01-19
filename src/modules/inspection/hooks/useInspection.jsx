import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../utils/queryClient.js";
import {
	addInspectionService,
	getInspectionsService,
} from "../services/inspectionServices.js";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { getInsurersSelectService } from "../../insurers/services/insurersServices.js";
import {
	getInsuredBranchesSelectService,
	getInsuredsSelectService,
} from "../../insured/services/insuredServices.js";
import { getEmployeesSelectService } from "../../employees/services/employeesServices.jsx";
import { getRiskTypesSelectService } from "../../insurers/services/riskTypeServices.js";
import { getInsurerBranchesSelectService } from "../../insurers/services/insurerBranchesServices.js";
import { getRatesByRiskService } from "../../insurers/services/ratesServices.js";

export const useInspection = (enable, insurerId, insuredId, riskTypeId) => {
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

	const { data: insurersSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_INSURERS_SELECT],
		queryFn: getInsurersSelectService,
		enabled: !!enable,
		staleTime: 1 * 60 * 1000,
	});

	const { data: insurerBranchesSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_INSURER_BRANCHES_SELECT, insurerId],
		queryFn: () => getInsurerBranchesSelectService(insurerId),
		enabled: !!enable && !!insurerId,
		staleTime: 1 * 60 * 1000,
	});

	const { data: insuredsSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_INSUREDS_SELECT],
		queryFn: getInsuredsSelectService,
		enabled: !!enable,
		staleTime: 1 * 60 * 1000,
	});

	const { data: insuredBranchesSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_INSURED_BRANCHES_SELECT, insuredId],
		queryFn: () => getInsuredBranchesSelectService(insuredId),
		enabled: !!enable && !!insuredId,
		staleTime: 1 * 60 * 1000,
	});

	const { data: employeesSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_EMPLOYEES_SELECT],
		queryFn: getEmployeesSelectService,
		enabled: !!enable,
		staleTime: 1 * 60 * 1000,
	});

	const { data: riskTypesSelect } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_RISK_TYPES_SELECT, insurerId],
		queryFn: () => getRiskTypesSelectService(insurerId),
		enabled: !!enable && !!insurerId,
		staleTime: 1 * 60 * 1000,
	});

	// getRatesByRiskService

	const { data: ratesByRisk } = useQuery({
		queryKey: [QUERY_KEYS.INSPECTIONS_RATES_BY_RISK, insurerId, riskTypeId],
		queryFn: () => getRatesByRiskService(insurerId, riskTypeId),
		enabled: !!enable && !!insurerId && !!riskTypeId,
		staleTime: 1 * 60 * 1000,
	});

	return {
		insuredsSelect,
		insuredBranchesSelect,
		insurersSelect,
		insurerBranchesSelect,
		employeesSelect,
		riskTypesSelect,
		ratesByRisk,
		inspections,
		isInspectionsFetching,
		addInspection,
	};
};
