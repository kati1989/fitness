import { useGym } from "@/services/useGym";
import {
  Box,
  Container,
  Grid2 as Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GymMap } from "./components/GymMap";
import { SubscriptionCard } from "@/pages/Gyms/views/Gym/components/SubscriptionCard";

// Mock data for gym details
// const mockGymData = {
//   id: 1,
//   name: "Elite Fitness Gym",
//   description:
//     "Achieve your fitness goals with state-of-the-art equipment, expert trainers, and a welcoming community.",
//   location: "Bucuresti, Strada Aviatorilor, Nr 2",
//   primary_phone_contact: "+40 747 033 345",
//   primary_email_contact: "elitefitness@gyms.ro",
//   image:
//     "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
//   comments: [
//     "Great gym with excellent facilities.",
//     "The trainers are very professional and helpful.",
//     "Amazing environment for fitness enthusiasts!",
//   ],
//   rank: 4.5,
//   subscriptions: [
//     {
//       plan: "Basic Plan",
//       price: "$30/month",
//       duration: "1 month",
//     },
//     {
//       plan: "Premium Plan",
//       price: "$50/month",
//       duration: "1 month",
//     },
//     {
//       plan: "Annual Plan",
//       price: "$500/year",
//       duration: "12 months",
//     },
//   ],
// };

export const Gym = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGym(id ? id : "2");
  const theme = useTheme();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading gyms</div>;
  }

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: 0,
          height: "600px",
          zIndex: -1,
        }}
      >
        <Box
          component={"img"}
          src={data?.image}
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            objectFit: "cover",
            filter: "blur(4px)",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            background: "rgba(0,0,0,0.3)",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold" }} color="#fff">
            {data?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "lg",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            pb: 1,
          }}
        >
          <Rating
            name="size-small"
            defaultValue={4.5}
            precision={0.5}
            size="large"
            sx={{
              color: theme.palette.background.default,
              "& .MuiRating-iconEmpty": {
                color: (theme) => theme.palette.background.default,
              },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          py: 3,
          mt: "600px",
        }}
      >
        <Container maxWidth={"lg"}>
          <Stack gap={4}>
            <Stack gap={2}>
              <Stack textAlign={"center"} gap={1}>
                <Typography variant="body1" fontWeight={"bold"} color="primary">
                  Pricing
                </Typography>
                <Typography variant={"h4"} fontWeight={"bold"}>
                  Choose the perfect plan to match your{" "}
                  <span style={{ color: theme.palette.primary.main }}>
                    fitness goals!
                  </span>
                </Typography>
                <Typography variant={"body1"}>{data?.description}</Typography>
              </Stack>
              <Grid
                container
                sx={{ display: "flex", alignContent: "center", mt: 10 }}
                spacing={2}
              >
                <Grid size={{ lg: 4, md: 6, sm: 12 }} sx={{ margin: "auto" }}>
                  <SubscriptionCard />
                </Grid>
                <Grid size={{ lg: 4, md: 6, sm: 12 }} sx={{ margin: "auto" }}>
                  <SubscriptionCard />
                </Grid>
                <Grid size={{ lg: 4, md: 6, sm: 12 }} sx={{ margin: "auto" }}>
                  <SubscriptionCard />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Container>
        <Box sx={{ height: "400px" }}>
          <GymMap lat={0} lng={0} name={""} />
        </Box>
      </Box>
    </>
  );
};
