import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
// type it as any....
const theme = (createMuiTheme as any)({
  typography: {
    h3: {
      color: "#fff",
    },
    h4: {
      fontSize: 32,
    },
    loading: "#fff",
  },

  paper: {
    backgroundColor: "#888",
  },
  palette: {
    primary: {
      main: "#12ECE5",
    },
    secondary: {
      main: "#ccc",
    },
    error: {
      main: "#f51a19",
    },
    background: {
      default: "#000",
    },
  },
  divider: {},
  overrides: {
    MUIDataTableToolbarSelect: {
      root: {
        backgroundColor: "#FFF",
      },
    },
    MUIDataTableFilter: {
      root: {
        backgroundColor: "#FFF",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#12ECE544",
      },
    },
  },
});

export default theme;
