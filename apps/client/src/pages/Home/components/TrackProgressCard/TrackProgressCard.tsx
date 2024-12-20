import StepperMUI from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Grid2 as Grid, Typography } from "@mui/material";
import { IconFlag } from "@/assets/icons";
import { Card } from "@/components/Card";

const steps = ["Set goals", "Stay consistent", "Push limits"];

interface TrackProgressCardProps {
  delay?: number;
}
export const TrackProgressCard = ({ delay }: TrackProgressCardProps) => {
  return (
    <Card title="Track progress" delay={delay}>
      <Grid container spacing={1}>
        <Grid size={2}>
          <IconFlag />
        </Grid>
        <Grid size={10} container spacing={1}>
          <Grid>
            <Typography variant="body2">
              The only bad workout is the one that didn’t happen.
            </Typography>
          </Grid>
          <Grid>
            <StepperMUI activeStep={3} orientation="vertical">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StepperMUI>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
