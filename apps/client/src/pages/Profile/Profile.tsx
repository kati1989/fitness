import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid2 as Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  LinearProgress,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "@/services/use-user";

export const Profile = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useUser();

  const user = {
    workouts: [
      {
        description: "Attended HIIT class at Gold Gym",
        date: new Date("2021-10-10").toTimeString(),
      },
      {
        description: "Completed 5k Run in 25 minutes",
        date: new Date("2021-10-10").toTimeString(),
      },
      {
        description: "Completed 50 Workouts",
      },
      {
        description: "Visited 10 Gyms",
      },
      {
        description: "Burned 1000 Calories",
      },
    ],
    activeSubscriptions: [
      {
        name: "Gold Gym Membership",
        gym: {
          name: "Gold Gym",
          id: "1ab4S3GSJHs-Jhsg12",
        },
        expiryDate: new Date("2025-01-15").toTimeString(),
        type: "Premium",
      },
      {
        name: "CrossFit Studio Access",
        gym: {
          name: "CrossFit Studio",
          id: "1ab4S3GSJHs-Jhsg12",
        },
        expiryDate: new Date("2025-02-10").toTimeString(),
        type: "Standard",
      },
      {
        name: "Yoga Class Subscription",
        gym: {
          name: "Yoga Studio",
          id: "1ab4S3GSJHs-Jhsg12",
        },
        expiryDate: new Date("2025-03-20").toTimeString(),
        type: "Standard",
      },
    ],
    milestones: ["5k Run", "50 Workouts", "10 Gyms", "1000 Calories Burned"],
  };

  const getProgress = () => {
    const totalWorkpits = user.workouts.length;
    const completedWorkouts = user.workouts.filter(
      (workout) => workout.date
    ).length;
    return (completedWorkouts / totalWorkpits) * 100;
  };

  return (
    <Stack divider={<Divider />} sx={{ gap: 2 }}>
      <Box>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 200, height: 200 }}
              src={userInfo?.profileImage}
            />
          }
          title={
            <Typography variant="h4" fontWeight="bold">
              {userInfo?.firstname} {userInfo?.lastname}
            </Typography>
          }
          subheader={
            <Typography variant="body1" color="textSecondary">
              {userInfo?.role}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {userInfo?.about}
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Fitness Progress
          </Typography>
          <Stack>
            <Stack>
              <Typography>Progress</Typography>
              <LinearProgress
                variant="determinate"
                value={getProgress()}
                sx={{ height: 10, my: 1 }}
              />
              <Typography variant="caption">
                {getProgress()}% complete
              </Typography>
            </Stack>
            <Stack>
              <Typography>Milestones Achieved</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {user.milestones.map((milestone) => (
                  <Chip
                    icon={<StarIcon />}
                    key={milestone}
                    label={milestone}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ lg: 6 }}>
          <Box>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {user.workouts
                  .filter((workout) => workout.date)
                  .map((workout) => (
                    <ListItem key={workout.description} divider>
                      <FitnessCenterIcon
                        sx={{ color: "primary.main", mr: 2 }}
                      />
                      <ListItemText
                        primary={workout.description}
                        secondary={workout.date}
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Box>
        </Grid>
        <Grid size={{ lg: 6 }}>
          <Box>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Active Subscriptions
              </Typography>
              <List>
                {user.activeSubscriptions.map((subscription) => (
                  <ListItem key={subscription.name} divider>
                    <NavLink
                      to={`/gyms/${subscription.gym.id}`}
                      style={{ color: "#020202" }}
                    >
                      <ListItemText
                        primary={subscription.name}
                        secondary={`Expires on ${subscription.expiryDate}`}
                      />
                    </NavLink>
                    <Chip
                      icon={<MonetizationOnIcon />}
                      label={subscription.type}
                      color={
                        subscription.type === "Premium" ? "warning" : "info"
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="textSecondary">
          Ready to set new goals and track your progress?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/gyms")}
        >
          Explore More Gyms
        </Button>
      </Box>
    </Stack>
  );
};
