import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";

interface GymCardProps {
  image?: string;
  title: string;
  description: string;
  gymId: string;
  score: number;
}

export const GymCard = ({
  image,
  title,
  description,
  gymId,
  score,
}: GymCardProps) => {
  const navigate = useNavigate();

  const goToGym = () => {
    navigate(`${gymId}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia component="img" height="180" image={image} alt="Gym Image" />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
        mt="auto"
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={goToGym}
        >
          Details
        </Button>
        <Rating name="size-small" value={score} precision={0.5} readOnly />
      </Box>
    </Card>
  );
};
