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
    <Card>
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
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={goToGym}
        >
          details
        </Button>
        <Rating
          name="size-small"
          defaultValue={score}
          precision={0.5}
          readOnly
          // sx={{
          //   color: theme.palette.primary.main,
          //   "& .MuiRating-iconEmpty": {
          //     color: (theme) => theme.palette.primary.main,
          //   },
          // }}
        />
      </Box>
    </Card>
  );
};
