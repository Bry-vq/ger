import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { CITES } from "../../../../const/departments";
const filterOptions = createFilterOptions({
  stringify: (option) => option.name,
  limit: 8,
});
export const BranchForm = ({ register, onSubmit, errors, setValue }) => {
  return (
    <form id="branch-form" onSubmit={onSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          label="Nombre Sucursal"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address ? errors.address.message : ""}
          required
        />
      </Box>
    </form>
  );
};
