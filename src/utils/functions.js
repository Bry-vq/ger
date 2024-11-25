// Helper function to format numbers as Colombian Pesos
export const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    }).format(value);
};

// Helper function to format insurability_range as currency
export const formatRangeAsCurrency = (range) => {
	const [start, end] = range.split(" - ").map(Number);
	return `${formatCurrency(start)} - ${formatCurrency(end)}`;
};
