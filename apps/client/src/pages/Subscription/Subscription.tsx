import { useMembership } from "@/services/useGym";
import { useParams } from "react-router-dom";
import { Payment } from "./components/payment";
import { PaymentDetails } from "./components/paymentDetails";
import { CircularProgress, Grid2 as Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { MembershipDuration } from "@/app-router";
import { useAddMembership } from "@/services/use-user";
import { useState } from "react";
import { PaymentProcessing } from "./components/paymentProcessing";

export const Subscription = () => {
  const { id } = useParams();
  function useQueryParams() {
    return new URLSearchParams(useLocation().search);
  }
  const queryParams = useQueryParams();
  const membershipDuration = queryParams.get("duration") as MembershipDuration;

  const [transactionLoading, setTransactionLoading] = useState(false);
  const { data, isLoading, isError } = useMembership(id!);
  const { addMembership } = useAddMembership();

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error loading subscription</div>;
  }

  const submitPayment = () => {
    setTransactionLoading(true); // Set loading to true before starting the mock payment

    setTimeout(() => {
      setTransactionLoading(false); // After 2 seconds, set loading to false
      addMembership(id!); // Simulate adding the membership after the payment "processes"
    }, 2000);
  };

  if (transactionLoading) {
    return <PaymentProcessing />;
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Payment submitPayment={submitPayment} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <PaymentDetails
          gymName={data?.gym.name ?? ""}
          price={
            membershipDuration === "monthly"
              ? Number(data?.membership.monthly_price ?? 0)
              : Number(data?.membership.yearly_price ?? 0)
          }
          subscriptionType={data?.membership.type ?? ""}
        />
      </Grid>
    </Grid>
  );
};
