import { Divider, Stack, Typography } from "@mui/material";

interface PaymentDetailsProps {
  gymName: string;
  subscriptionType: string;
  price: number;
}
export const PaymentDetails = ({
  gymName,
  subscriptionType,
  price,
}: PaymentDetailsProps) => {
  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Gym Name</Typography>
        <Typography>{gymName}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Subscription Type</Typography>
        <Typography>{subscriptionType}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="button" fontWeight={"bold"} fontSize={"1.2rem"}>
          total
        </Typography>
        <Typography variant="button" fontWeight={"bold"} fontSize={"1.2rem"}>
          {price}
        </Typography>
      </Stack>
    </Stack>
  );
};
