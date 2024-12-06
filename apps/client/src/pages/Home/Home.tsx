import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button, Paper, Stack, Typography } from "@mui/material";
import theme from "@/theme";
import { PersonalCoachCard } from "@/pages/Home/components/PersonalCoachCard";
import { TrackProgressCard } from "@/pages/Home/components/TrackProgressCard";
import { grey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";

export const Home = () => {
  // `radial-gradient(farthest-corner circle at 0% 0%, var(--muidocs-palette-grey-50) 0%, var(--muidocs-palette-primary-50) 100%)`;
  const color = grey[50];
  const transparentPrimary = alpha(theme.palette.primary.light, 0.1);

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid
          size={{ md: 6 }}
          container
          sx={{ display: "flex", alignContent: "center" }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid>
                <Typography variant="h2" color="primary">
                  <b>Push yourself</b>
                </Typography>
                <Typography variant="h2">
                  <b>no one else</b>
                </Typography>
                <Typography variant="h2">
                  <b>is going to</b>
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1">
                  Success in fitness is not about being the best; it’s about
                  pushing yourself to be better every day. Embrace the
                  challenges, stay consistent, and trust that your hard work
                  will lead you to your goals.
                </Typography>
              </Grid>
              <Grid>
                <Button variant="contained" sx={{ textTransform: "inherit" }}>
                  Discover our programmes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ md: 6 }}>
          <Paper
            sx={{
              background: `radial-gradient(farthest-corner circle at 0% 0%, ${color} 0%, ${transparentPrimary} 100%)`,
              height: 700,
              minWidth: 2000,
              overflow: "hidden",
              position: "relative",
              borderRadius: 0,
              borderEndStartRadius: 12,
              border: 1,
              borderColor: theme.palette.divider,
            }}
          >
            <Grid container spacing={3} p={3}>
              <Grid size={{ md: 2.3 }}>
                <Stack gap={3}>
                  <PersonalCoachCard value={3.5} />
                </Stack>
              </Grid>
              <Grid size={2.3}>
                <TrackProgressCard />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
