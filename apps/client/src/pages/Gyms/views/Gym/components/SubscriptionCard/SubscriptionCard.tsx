import { Membership } from "@/services/useGym";
import {
  Box,
  Button,
  Card,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `styled-tab-${index}`,
    "aria-controls": `styled-tabpanel-${index}`,
  };
}

interface SubscriptionTypeProps {
  membership: Membership;
}
export const SubscriptionCard = ({ membership }: SubscriptionTypeProps) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ textAlign: "center", maxWidth: "350px", margin: "auto" }}>
      <Stack sx={{ gap: 2, p: 2 }}>
        <Typography variant="body1" fontWeight={"bold"}>
          {membership.type}
        </Typography>
        <Typography variant="body1">{membership.description}</Typography>
        <Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="custom styled tabs with traveling background"
            TabIndicatorProps={{ style: { display: "none" } }}
            centered
          >
            <Tab
              label="Monthly"
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                position: "relative",
                zIndex: 1,
              }}
            />
            <Tab
              label="Yearly"
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                position: "relative",
                zIndex: 1,
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              color={theme.palette.primary.main}
            >
              ${membership.monthly_price}
            </Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              color={theme.palette.primary.main}
            >
              ${membership.yearly_price}
            </Typography>
          </CustomTabPanel>
        </Stack>
        <Typography variant="body2">{membership.short_description}</Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Get started
        </Button>
      </Stack>
    </Card>
  );
};
