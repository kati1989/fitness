import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useLetReview } from "@/services/useGym";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface GiveReviewProps {
  gymId: string;
}

export const GiveReview = ({ gymId }: GiveReviewProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [open, setOpen] = React.useState(false);

  const { isLoading, isError, sendRequest } = useLetReview();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === null) {
      alert("Please provide a rating before submitting!");
      return;
    }

    sendRequest({ gymId, rating, comment: review });

    console.log("Review Submitted:", { rating, review });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      direction={"row"}
      justifyContent={"end"}
      alignItems={"center"}
      spacing={3}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        You have a membership at this gym
      </Typography>
      <Button onClick={handleOpen} variant={"contained"}>
        Let review
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Typography variant="h5" fontWeight="bold">
                  Share Your Experience
                </Typography>
                <Box>
                  <Typography component="legend">
                    How would you rate us?
                  </Typography>
                  <Rating
                    name="user-rating"
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                    precision={1}
                    size="large"
                  />
                </Box>
                <Box>
                  <Typography component="legend">
                    Share your experience
                  </Typography>
                  <TextField
                    placeholder="We’d love to hear your thoughts..."
                    minRows={4}
                    multiline
                    fullWidth
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </Box>

                {isLoading ? (
                  "Loading..."
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!rating || !review.trim()}
                  >
                    Submit Review
                  </Button>
                )}
                {isError && <Typography color="error">Error</Typography>}
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Stack>
  );
};
