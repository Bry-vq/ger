import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import {
  restrictToColombianPhone,
  restrictToNumbers,
} from "../../../utils/functions";

const documentTypes = [
  { id: 1, value: "CC", label: "Cédula de Ciudadanía" },
  { id: 2, value: "CE", label: "Cédula de Extranjería" },
  { id: 3, value: "NIT", label: "NIT" },
  { id: 4, value: "PAS", label: "Pasaporte" },
];

export const EmployeesForm = ({ register, control, errors, onSubmit }) => {
  return (
    <form id="employees-form" onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="Nombre"
        {...register("username")}
        variant="outlined"
        multiline
        sx={{ mb: 2 }}
      />
      <FormControl
        fullWidth
        margin="dense"
        sx={{ mb: 2 }}
        error={!!errors.documentType}
      >
        <InputLabel id="simple-select-label">
          Tipo de Documento del Asegurado
        </InputLabel>
        <Controller
          name="documentType"
          labelId="simple-select-label"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Tipo de Documento del Asegurado"
              error={!!errors.documentType}
            >
              <MenuItem value="" disabled>
                Seleccione un tipo de documento
              </MenuItem>
              {documentTypes.map((type, i) => (
                <MenuItem key={type.id} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.documentType && (
          <Typography
            color="error.main"
            fontSize="small"
            sx={{ mt: "3px", ml: "14px", fontSize: "12px" }}
          >
            {errors.documentType.message}
          </Typography>
        )}
      </FormControl>
      <TextField
        fullWidth
        label="Documento"
        {...register("document")}
        onChange={restrictToNumbers}
        variant="outlined"
        multiline
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Correo"
        {...register("email")}
        variant="outlined"
        multiline
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Teléfono"
        {...register("phone")}
        onChange={restrictToColombianPhone}
        variant="outlined"
        multiline
        sx={{ mb: 2 }}
      />
    </form>
  );
};
