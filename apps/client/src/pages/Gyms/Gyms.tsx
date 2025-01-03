import { useGyms } from "@/services/useGym";
import { GymCard } from "./components/GymCard";
import { Grid2 as Grid } from "@mui/material";

export const Gyms = () => {
  const { data, isError, isLoading } = useGyms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading gyms</div>;
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignContent: "center" }}
      >
        {data?.map((gym) => (
          <Grid size={{ lg: 4, md: 6, sm: 12 }}>
            <GymCard
              gymId={gym.id.toString()}
              key={gym.id}
              image={
                gym.image ||
                "https://via.placeholder.com/3840x2160.png?text=Gym+Image"
              }
              title={gym.name}
              description={gym.description || "No description available."}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
