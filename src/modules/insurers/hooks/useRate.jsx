import { useMutation, useQuery } from "@tanstack/react-query";
import { getInsurabilityRangesService } from "../services/rangesServices.js";
import { QUERY_KEYS } from "../../../utils/constanst.js";
import { getRiskTypesService } from "../services/riskTypeServices.js";
import {
	addRateService,
	getRatesService,
	updateRateService,
} from "../services/ratesServices.js";
import { queryClient } from "../../../utils/queryClient.js";
import { formatCurrency } from "../../../utils/functions.js";

export const useRate = (insurerId) => {
	// Create rate
	const { mutate: createRate } = useMutation({
		mutationFn: addRateService,
		onSuccess: () => {
			queryClient().invalidateQueries(QUERY_KEYS.RATES);
		},
	});

	// Update rate
	const { mutate: updateRate } = useMutation({
		mutationFn: updateRateService,
		onSuccess: () => {
			queryClient().invalidateQueries(QUERY_KEYS.RATES);
		},
	});

	// Fetch rates
	const { data: rates, isFetching: isRatesFetching } = useQuery({
		queryKey: [QUERY_KEYS.RATES, insurerId],
		queryFn: () => getRatesService(insurerId),
	});

	// Fetch insurability ranges
	const { data: ranges, isFetching: isRangesFetching } = useQuery({
		queryKey: [QUERY_KEYS.RANGES, insurerId],
		queryFn: () => getInsurabilityRangesService(insurerId),
	});

	// Fetch risk types
	const { data: riskTypes, isFetching: isRiskTypesFetching } = useQuery({
		queryKey: [QUERY_KEYS.RISK_TYPE, insurerId],
		queryFn: () => getRiskTypesService(insurerId),
	});

	// Map ranges for the select input
	const mappedRanges =
		ranges?.map((range) => ({
			value: range.id,
			label: `${formatCurrency(range.rangeStart)} - ${formatCurrency(range.rangeEnd)}`, // Label for the user
		})) || [];

	// Map risk types for the select input
	const mappedRiskTypes =
		riskTypes?.map((type) => ({
			value: type.id, // ID as value for the select
			label: `${type.name} - ${type.description}`, // Name as label for the user
		})) || [];

	// 📌 Flatten rates TODO: this can be improved from backend
	const flattenedRates =
		rates?.map((rate) => ({
			id: rate.id,
			insurerId: rate.insurerId,
			insuredValue: rate?.insuredValue ?? 0,
			fee: rate?.fee ?? 0,
			riskTypeId: rate?.riskType?.id ?? "",
			riskTypeName: rate?.riskType?.name ?? "",
			riskTypeDescription: rate?.riskType?.description ?? "",
			insurabilityRangeId: rate?.insurabilityRange?.id ?? "",
			insurabilityRangeText: `${formatCurrency(rate?.insurabilityRange?.rangeStart) ?? 0} - ${formatCurrency(rate?.insurabilityRange?.rangeEnd) ?? 0}`,
			insurerName: rate?.insurer?.name ?? "",
			...rate,
		})) || [];

	return {
		rates: flattenedRates,
		isRatesFetching,
		createRate,
		updateRate,
		ranges: mappedRanges,
		riskTypes: mappedRiskTypes,
		isRangesFetching,
		isRiskTypesFetching,
	};
};
