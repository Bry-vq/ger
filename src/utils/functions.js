// Helper function to format numbers as Colombian Pesos
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};

export const restrictToNumbers = (event) => {
  const numericValue = event.target.value.replace(/\D/g, ""); // Reemplaza todo lo que no sea número
  event.target.value = numericValue; // Actualiza el valor del input
  return numericValue; // Retorna el valor numérico
};

export const restrictToColombianPhone = (event) => {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length > 3 && value.length <= 6) {
    value = `${value.slice(0, 3)} ${value.slice(3)}`;
  } else if (value.length > 6) {
    value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 10)}`;
  }

  event.target.value = value;
  return value;
};
