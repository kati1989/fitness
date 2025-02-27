import { Card } from "@/components/Card";
import { Avatar, CardHeader, Rating, Stack, Typography } from "@mui/material";

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
    <Card variant="secondary">
      <Stack spacing={2}>
        <Stack gap={1}>
          {comment && (
            <Typography variant="body2">
              <b>
                <i>"{comment}"</i>
              </b>
            </Typography>
          )}
        </Stack>
        <CardHeader
          sx={{ p: 0 }}
          avatar={
            <Avatar src={imageUrl!} alt={userName}>
              {userName[0].toUpperCase()}
            </Avatar>
          }
          title={userName}
        />
        <Rating name="read-only" value={score} precision={0.5} readOnly />
      </Stack>
    </Card>
  );
};
