import { IconFitnessCenter } from "@/assets/icons";
import { Card } from "@/components/Card";
import theme from "@/theme";
import { Avatar, CardHeader, Rating, Stack, Typography } from "@mui/material";

interface CardProps {
  value: number;
  delay?: number;
}
export const PersonalCoachCard = ({ value, delay }: CardProps) => {
  return (
    <Card title="Get yourself a personal coach" variant="primary" delay={delay}>
      <Stack spacing={2}>
        <Stack gap={1}>
          <IconFitnessCenter />
          <Typography variant="body2">
            <b>
              <i>
                "Your body can stand almost anything. It’s your mind you have to
                convince."
              </i>
            </b>
          </Typography>
        </Stack>
        <CardHeader
          sx={{ p: 0 }}
          avatar={<Avatar>PA</Avatar>}
          title="Pop Andrei"
          subheader="Personal Coach"
          subheaderTypographyProps={{
            sx: {
              color: (theme) => theme.palette.background.default,
              fontWeight: "bold",
            },
          }}
        />
        <Rating
          name="read-only"
          value={value}
          precision={0.5}
          readOnly
          sx={{
            color: theme.palette.background.default,
            "& .MuiRating-iconEmpty": {
              color: (theme) => theme.palette.background.default,
            },
          }}
        />
      </Stack>
    </Card>
  );
};
