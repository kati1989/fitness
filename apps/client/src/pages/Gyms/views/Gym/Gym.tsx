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
import { CommentCarousel } from "./components/CommentCarousel/CommentCarousel";
import { GiveReview } from "./components/GiveReview";

export const Gym = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGym(id ? id : "2");
  const theme = useTheme();

  const getLocation = (location: string) => {
    const [lat, lng] = location.split(",").map((coord) => parseFloat(coord));
    return { lat, lng };
  };

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
          {data?.score ? (
            <Rating
              name="size-small"
              defaultValue={data.score}
              precision={0.5}
              size="large"
              sx={{
                color: theme.palette.background.default,
                "& .MuiRating-iconEmpty": {
                  color: (theme) => theme.palette.background.default,
                },
              }}
            />
          ) : (
            <Typography color="#fff" variant="h6" fontWeight={"bold"}>
              No feedback yet! Be the first to make an impact.
            </Typography>
          )}
        </Box>
      </Box>
      <Stack
        sx={{
          backgroundColor: theme.palette.background.default,
          mt: "550px",
          gap: 6,
        }}
      >
        <Container maxWidth={"lg"}>
          {data?.hasUserMemberships && <GiveReview gymId={id!} />}
          <Stack gap={4} sx={{ mt: "50px" }}>
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
                {data?.memberships?.map((membership) => (
                  <Grid
                    size={{ lg: 4, md: 6, sm: 12 }}
                    sx={{ margin: "auto" }}
                    key={membership.description}
                  >
                    <SubscriptionCard membership={membership} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Container>
        {data?.location && (
          <>
            <Typography variant="h2" color="primary" align="center">
              Where{" "}
              <b
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                  padding: 8,
                }}
              >
                You can
              </b>{" "}
              find us
            </Typography>
            <Box sx={{ height: "400px" }}>
              <GymMap
                lat={getLocation(data?.location).lat}
                lng={getLocation(data?.location).lng}
                name={data.name}
              />
            </Box>
          </>
        )}
        <Container maxWidth={"lg"}>
          <Stack alignItems={"center"} spacing={3}>
            {data?.comments && data?.comments?.length > 0 && (
              <>
                <Typography variant="h2" color="primary">
                  Customer's{" "}
                  <b
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
                      padding: 8,
                    }}
                  >
                    Review
                  </b>
                </Typography>
                <CommentCarousel comments={data?.comments} />
              </>
            )}
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
