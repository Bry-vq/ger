import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { CITES } from "../../../../const/departments";
import {
  restrictToColombianPhone,
  restrictToNumbers,
} from "../../../../utils/functions";

const filterOptions = createFilterOptions({
  stringify: (option) => option.name,
  limit: 8,
});

export const InsureForm = ({ register, onSubmit, errors, setValue }) => {
  return (
    <form id="insure-form" onSubmit={onSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nombre"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          required
        />
        <TextField
          label="Documento"
          {...register("document")}
          onChange={restrictToNumbers}
          error={!!errors.document}
          helperText={errors.document ? errors.document.message : ""}
          required
        />
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          required
        />
        <Autocomplete
          disablePortal
          onChange={(_, newValue) => {
            setValue("department", newValue.department);
            setValue("city", newValue.name);
          }}
          disableClearable
          filterOptions={filterOptions}
          options={CITES}
          getOptionLabel={(option) => `${option.name} - ${option.department}`}
          renderOption={(props, option) => {
            const { ...optionProps } = props;
            return (
              <Box key={option.id} component="li" {...optionProps}>
                {`${option.name} - ${option.department}`}
              </Box>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Ciudad" />}
        />
        <TextField
          label="Dirección"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address ? errors.address.message : ""}
          required
        />
        <TextField
          label="Teléfono"
          {...register("phone")}
          onChange={restrictToColombianPhone}
          error={!!errors.phone}
          helperText={errors.phone ? errors.phone.message : ""}
          required
        />
      </Box>
    </form>
  );
};
