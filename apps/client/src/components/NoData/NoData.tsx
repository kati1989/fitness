import noData from "@/assets/no-data.svg";
import { Stack, Typography } from "@mui/material";

interface NoDataProps {
  label: string;
}
export const NoData = ({ label }: NoDataProps) => {
  return (
    <Stack alignItems={"center"}>
      <img width={"200px"} src={noData} />
      <Typography variant="overline" fontWeight={"bold"}>
        {label}
      </Typography>
    </Stack>
  );
};
