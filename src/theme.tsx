import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#E4AF9B",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e4af9b",
          "&:hover": {
            // hover時背景色
            background: "#e4af9b",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { Color: "#e4af9b" },
      },
    },
  },
});

export default theme;
