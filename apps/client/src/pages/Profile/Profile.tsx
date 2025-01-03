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

export const Profile = () => {
  return (
    <Stack divider={<Divider />} sx={{ gap: 2 }}>
      <Box>
        <CardHeader
          avatar={<Avatar sx={{ width: 100, height: 100 }} />}
          title={
            <Typography variant="h4" fontWeight="bold">
              Pop Andrei
            </Typography>
          }
          subheader={
            <Typography variant="body1" color="textSecondary">
              Fitness Enthusiast | 25 Workouts This Month
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Achieving milestones every day! Passionate about staying healthy and
            exploring new gyms in the area.
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
              <Typography>Weekly Goal Progress</Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ height: 10, my: 1 }}
              />
              <Typography variant="caption">75% complete</Typography>
            </Stack>
            <Stack>
              <Typography>Milestones Achieved</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  icon={<StarIcon />}
                  label="5k Run"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<StarIcon />}
                  label="50 Workouts"
                  color="secondary"
                  variant="outlined"
                />
                <Chip
                  icon={<StarIcon />}
                  label="10 Gyms"
                  color="success"
                  variant="outlined"
                />
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
                <ListItem>
                  <FitnessCenterIcon sx={{ color: "primary.main", mr: 2 }} />
                  <ListItemText
                    primary="Attended HIIT class at Gold Gym"
                    secondary="2 days ago"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <FitnessCenterIcon sx={{ color: "secondary.main", mr: 2 }} />
                  <ListItemText
                    primary="Completed 5k Run in 25 minutes"
                    secondary="4 days ago"
                  />
                </ListItem>
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
                <ListItem>
                  <ListItemText
                    primary="Gold Gym Membership"
                    secondary="Expires on: 15 Jan 2025"
                  />
                  <Chip
                    icon={<MonetizationOnIcon />}
                    label="Premium"
                    color="warning"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="CrossFit Studio Access"
                    secondary="Expires on: 10 Feb 2025"
                  />
                  <Chip
                    icon={<MonetizationOnIcon />}
                    label="Standard"
                    color="info"
                  />
                </ListItem>
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
        <Button variant="contained" color="primary">
          Explore More Gyms
        </Button>
      </Box>
    </Stack>
  );
};
