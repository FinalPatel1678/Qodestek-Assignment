import { createTheme } from "@mui/material/styles";

const primary = "#002D24";
const secondary = "#46E696";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff",
    },
    secondary: {
      main: secondary,
      contrastText: "#fff",
    },
    background: {
      default: "#eeeeee",
    },
    success: {
      main: "#4caf50",
      contrastText: "#fff",
      dark: "#2e7d32",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#fff",
      dark: "#ef6c00",
    },
    info: {
      main: "#03a9f4",
      contrastText: "#fff",
      dark: "#0277bd",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
      dark: "#c62828",
    },
  },
});

export default theme;
