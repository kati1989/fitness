import { useMembership } from "@/services/useGym";
import { Navigate, useParams } from "react-router-dom";
import { Payment } from "./components/payment";
import { PaymentDetails } from "./components/paymentDetails";
import { CircularProgress, Grid2 as Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAddMembership } from "@/services/use-user";
import { useState } from "react";
import { PaymentProcessing } from "./components/paymentProcessing";

const membershipDurations = ["monthly", "yearly"] as const;
export type MembershipDuration = (typeof membershipDurations)[number];

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

  if (
    !membershipDuration ||
    !Object.values(membershipDurations).includes(membershipDuration)
  ) {
    return <Navigate to={`/gyms`} replace />;
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error loading subscription</div>;
  }

  const submitPayment = () => {
    setTransactionLoading(true);

    setTimeout(() => {
      setTransactionLoading(false);
      addMembership(id!);
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
