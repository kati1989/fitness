import { Box, Stack, Typography } from "@mui/material";

interface PayCardProps {
  bgColor: string;
  image: string;
}

export const PayCard = ({ bgColor, image }: PayCardProps) => {
  return (
    <Box
      sx={{
        p: 4,
        background: bgColor,

        color: "white",
        width: 450,
        borderRadius: 4,
        boxShadow: 4,
      }}
    >
      <Stack gap={4} pt={4}>
        <Stack>
          <Typography variant="button" fontWeight={"bold"} fontSize={11}>
            card number
          </Typography>
          <Typography variant="body1" fontWeight={"bold"} fontSize={30}>
            **** **** **** 1234
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction="row" gap={6}>
            <Stack>
              <Typography variant="button" fontWeight={"bold"} fontSize={11}>
                valid
              </Typography>
              <Typography variant="body1" fontSize={30}>
                12/24
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="button" fontWeight={"bold"} fontSize={11}>
                cvv
              </Typography>
              <Typography variant="body1" fontWeight={"bold"} fontSize={30}>
                123
              </Typography>
            </Stack>
          </Stack>
          <img style={{ width: 70 }} src={image} />
        </Stack>
      </Stack>
    </Box>
  );
};
