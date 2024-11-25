// theme.ts
import { createTheme, alpha } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

// Definición de colores
const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const primary = {
  lighter: "#C3C3F4",
  light: "#4B4BBD",
  main: "#000024",
  dark: "#000019",
  darker: "#000011",
  contrastText: "#FFFFFF",
};

const secondary = {
  lighter: "#ecfefc",
  light: "#bbfcf4",
  main: "#a3fbf0",
  dark: "#72f9e8",
  darker: "#5af8e4",
  contrastText: "#FFFFFF",
};

const info = {
  lighter: "#CAFCF9",
  light: "#61E7F2",
  main: "#00A7D6",
  dark: "#00619A",
  darker: "#003266",
  contrastText: "#FFFFFF",
};

const success = {
  lighter: "#E4FBD2",
  light: "#98E977",
  main: "#36B722",
  dark: "#118313",
  darker: "#065715",
  contrastText: "#FFFFFF",
};

const warning = {
  lighter: "#FFF8CC",
  light: "#FFE466",
  main: "#FFC700",
  dark: "#B78600",
  darker: "#7A5400",
  contrastText: grey[800],
};

const error = {
  lighter: "#FDE7CE",
  light: "#F4A16B",
  main: "#DB420F",
  dark: "#9D1707",
  darker: "#690206",
  contrastText: "#FFFFFF",
};

const common = {
  black: "#000000",
  white: "#FFFFFF",
};

// Función para los overrides
const overrides = (theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        WebkitOverflowScrolling: "touch",
      },
      body: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
      },
      "#root": {
        width: "100%",
        height: "100%",
      },
      input: {
        "&[type=number]": {
          MozAppearance: "textfield",
          "&::-webkit-outer-spin-button": {
            margin: 0,
            WebkitAppearance: "none",
          },
          "&::-webkit-inner-spin-button": {
            margin: 0,
            WebkitAppearance: "none",
          },
        },
      },
      img: {
        maxWidth: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.grey[900], 0.8),
      },
      invisible: {
        background: "transparent",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      containedInherit: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.grey[800],
        "&:hover": {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
        },
      },
      sizeLarge: {
        minHeight: 48,
      },
      root: {
        borderRadius: Number(theme.shape.borderRadius) * 2,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: theme.shadows[3],
        borderRadius: Number(theme.shape.borderRadius) * 2,
        position: "relative",
        zIndex: 0,
      },
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: { variant: "h6" },
      subheaderTypographyProps: { variant: "body2" },
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 0),
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: alpha(theme.palette.grey[500], 0.24),
        },
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: Number(theme.shape.borderRadius) * 2,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        color: theme.palette.text.secondary,
        backgroundColor: "theme.palette.background.default",
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: {
        borderRadius: Number(theme.shape.borderRadius) * 2,
      },
    },
    defaultProps: {
      slotProps: {
        pagination: {
          labelRowsPerPage: "Filas por página",
          labelDisplayedRows: ({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
        },
      },
      localeText:{ noRowsLabel: "No hay resultados" }
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: theme.palette.grey[800],
      },
      arrow: {
        color: theme.palette.grey[800],
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      paragraph: {
        marginBottom: theme.spacing(2),
      },
      gutterBottom: {
        marginBottom: theme.spacing(1),
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        ...theme.typography.body2,
      },
    },
  },
});

// Crear el tema con los overrides
const theme = createTheme({
  palette: {
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    grey,
    common,
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: "#FFFFFF",
      default: grey[100],
    },
    action: {
      hover: alpha(grey[500], 0.08),
      selected: alpha(grey[500], 0.16),
      disabled: alpha(grey[500], 0.5),
      disabledBackground: alpha(grey[500], 0.24),
      active: grey[600],
    },
  },
  components: {
    ...overrides(createTheme()),
  },
});

export default theme;
