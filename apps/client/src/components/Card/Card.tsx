import theme from "@/theme";
import { Paper, Stack, Typography } from "@mui/material";
import "./Card.css";

interface CardProps {
  title: string;
  children: JSX.Element;
  variant?: "primary" | "secondary";
  delay?: number;
}
export const Card = ({ title, children, variant, delay }: CardProps) => {
  let { color, backgroundColor } = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  };

  if (variant === "primary") {
    backgroundColor = theme.palette.primary.main;
    color = theme.palette.background.default;
  }

  return (
    <>
      <Paper
        className="card-floating"
        style={{ animationDelay: `${delay}s` }}
        sx={{
          backgroundColor: backgroundColor,
          color: color,
          p: 3,
          border: 1,
          borderColor: theme.palette.divider,
        }}
        elevation={1}
      >
        <Stack spacing={2}>
          <Typography variant="h6">
            <b>{title}</b>
          </Typography>
          {children}
        </Stack>
      </Paper>
    </>
  );
};
