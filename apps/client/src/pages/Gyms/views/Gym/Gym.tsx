import { useGym } from "@/services/useGym";
import { Box, Container, Rating, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Mock data for gym details
const mockGymData = {
  id: 1,
  name: "Elite Fitness Gym",
  description:
    "Achieve your fitness goals with state-of-the-art equipment, expert trainers, and a welcoming community.",
  location: "Bucuresti, Strada Aviatorilor, Nr 2",
  primary_phone_contact: "+40 747 033 345",
  primary_email_contact: "elitefitness@gyms.ro",
  image:
    "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
  comments: [
    "Great gym with excellent facilities.",
    "The trainers are very professional and helpful.",
    "Amazing environment for fitness enthusiasts!",
  ],
  rank: 4.5,
  subscriptions: [
    {
      plan: "Basic Plan",
      price: "$30/month",
      duration: "1 month",
    },
    {
      plan: "Premium Plan",
      price: "$50/month",
      duration: "1 month",
    },
    {
      plan: "Annual Plan",
      price: "$500/year",
      duration: "12 months",
    },
  ],
};

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
      <Container maxWidth={"lg"} sx={{ py: 3, mt: "600px" }}>
        <Typography variant="body1">{data?.description}</Typography>
      </Container>
    </>
  );
};
