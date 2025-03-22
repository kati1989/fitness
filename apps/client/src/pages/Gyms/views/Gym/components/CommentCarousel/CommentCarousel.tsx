import { Comment as CommentType } from "@/services/useGym";
import { Comment } from "../Comment";
import { Stack } from "@mui/material";

interface CommentCarouselProps {
  comments: CommentType[];
}

export const CommentCarousel = ({ comments }: CommentCarouselProps) => {
  return (
    <Stack spacing={2} width={"100%"}>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          imageUrl={comment.user.profileImage}
          userName={comment.user.fullName}
          score={comment.score}
          comment={comment.comment}
        />
      ))}
    </Stack>
  );
};
