import { Theme } from "@mui/material/styles";

export const navigationStyles = (theme: Theme) => ({
  stack: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(5),
    py: theme.spacing(3),
    justifyContent: "flex-end",
  },
  navLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  navLinkActive: {
    color: theme.palette.primary.main,
  },
});
