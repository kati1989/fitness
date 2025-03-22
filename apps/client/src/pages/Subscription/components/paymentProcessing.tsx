import { CircularProgress, Typography, Stack } from "@mui/material";

export const PaymentProcessing = () => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="primary" />
      <Typography variant="h6" fontWeight="bold">
        Processing Payment...
      </Typography>
    </Stack>
  );
};
