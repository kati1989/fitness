import {
  Avatar,
  Box,
  CardHeader,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

interface CommentProps {
  imageUrl?: string | null;
  score: number;
  userName: string;
  comment: string;
}
export const Comment = ({
  imageUrl,
  score,
  userName,
  comment,
}: CommentProps) => {
  return (
    <Box bgcolor={grey[50]} p={2}>
      <Stack spacing={2}>
        <CardHeader
          sx={{ p: 0 }}
          avatar={
            <Avatar src={imageUrl!} alt={userName}>
              {userName[0].toUpperCase()}
            </Avatar>
          }
          title={userName}
        />
        <Stack gap={1}>
          {comment && (
            <Typography variant="body2">
              <b>
                <i>"{comment}"</i>
              </b>
            </Typography>
          )}
        </Stack>
        <Rating name="read-only" value={score} precision={0.5} readOnly />
      </Stack>
    </Box>
  );
};
