import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid2 as Grid,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "@/services/use-user";
import { NoData } from "@/components/NoData";
import { formatReadableLongDate } from "@/utils/date";

export const Profile = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useUser();

  const totalSubscriptions = userInfo?.memberships?.length || 0;

  return (
    <Stack divider={<Divider />} sx={{ gap: 4, padding: 2 }}>
      {/* Profile Header */}
      <Box>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={userInfo?.profileImage}
              alt={`${userInfo?.firstname} ${userInfo?.lastname}`}
            />
          }
          title={
            <Typography variant="h4" fontWeight="bold">
              {userInfo?.firstname} {userInfo?.lastname}
            </Typography>
          }
          subheader={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1" color="textSecondary">
                {userInfo?.role}
              </Typography>
              <Chip
                label={userInfo?.role === "Admin" ? "Administrator" : "Member"}
                color={userInfo?.role === "Admin" ? "error" : "default"}
                size="small"
              />
            </Stack>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {userInfo?.about}
          </Typography>
        </CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Member since {formatReadableLongDate(userInfo?.memberSince ?? "")}
        </Typography>
      </Box>

      {/* Additional Info Section */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              padding: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total Subscriptions
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {totalSubscriptions}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              padding: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Role
            </Typography>
            <Typography
              variant="h4"
              color={userInfo?.role === "Admin" ? "error" : "textPrimary"}
              fontWeight="bold"
            >
              {userInfo?.role}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Subscriptions Section */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Active Subscriptions
        </Typography>
        {userInfo?.memberships && userInfo?.memberships.length > 0 ? (
          <List sx={{ p: 0 }}>
            {userInfo?.memberships.map((membership) => (
              <ListItem
                key={membership.gym.id + membership.expiration}
                divider
                sx={{ display: "flex", justifyContent: "space-between", px: 0 }}
              >
                <NavLink
                  to={`/gyms/${membership.gym.id}`}
                  style={{ color: "#020202" }}
                >
                  <ListItemText
                    primary={membership.gym.name}
                    secondary={`Expires on ${formatReadableLongDate(
                      membership.expiration
                    )}`}
                  />
                </NavLink>
                <Chip
                  icon={<MonetizationOnIcon />}
                  label={membership.type}
                  color={membership.type === "PREMIUM" ? "warning" : "info"}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <NoData label="You have no subscriptions yet!" />
        )}
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" color="textSecondary">
          Ready to set new goals and track your progress?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/gyms")}
        >
          Explore More Gyms
        </Button>
      </Box>
    </Stack>
  );
};
