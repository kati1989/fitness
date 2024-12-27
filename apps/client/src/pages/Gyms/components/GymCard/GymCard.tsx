import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

interface GymCardProps {
  image?: string;
  title: string;
  description: string;
}
export const GymCard = ({ image, title, description }: GymCardProps) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <CardMedia component="img" height="180" image={image} alt="Gym Image" />
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <FitnessCenterIcon color="primary" />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button size="small" variant="contained" color="primary">
          Join Now
        </Button>
        <Typography variant="subtitle1" color="primary" fontWeight="bold">
          $50/month
        </Typography>
      </Box>
    </Card>
  );
};
