import { Comment as CommentType } from "@/services/useGym";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { Comment } from "../Comment";
import { IconArrowBackIos, IconArrowForwardIos } from "@/assets/icons";

interface CommentCarouselProps {
  comments: CommentType[];
}

export const CommentCarousel = ({ comments }: CommentCarouselProps) => {
  const [commentIndex, setCommentIndex] = useState(0);

  const handlePrevComment = () => {
    setCommentIndex((prevIndex) =>
      prevIndex === 0 ? comments.length - 1 : prevIndex - 1
    );
  };

  const handleNextComment = () => {
    setCommentIndex((prevIndex) =>
      prevIndex === comments.length - 1 ? 0 : prevIndex + 1
    );
  };

  const comment = comments[commentIndex];

  return (
    <Grid container alignItems="center">
      {/* Previous Button - Fixed Width */}
      <Grid item xs="auto">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Button onClick={handlePrevComment}>
            <IconArrowBackIos />
          </Button>
        </Box>
      </Grid>

      {/* Comment - Flexible Width */}
      <Grid item xs>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Comment
            comment={comment.comment}
            score={comment.score}
            userName={comment.user.fullName}
            imageUrl={comment.user.profileImage}
          />
        </Box>
      </Grid>

      {/* Next Button - Fixed Width */}
      <Grid item xs="auto">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Button onClick={handleNextComment}>
            <IconArrowForwardIos />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
