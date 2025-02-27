import {
  SvgIconPropsColorOverrides,
  SvgIconPropsSizeOverrides,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface IconProps {
  size?: OverridableStringUnion<
    "inherit" | "large" | "medium" | "small",
    SvgIconPropsSizeOverrides
  >;
  color?: OverridableStringUnion<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    SvgIconPropsColorOverrides
  >;
}
export const IconFitnessCenter = ({ size, color }: IconProps) => {
  return <FitnessCenterIcon fontSize={size} color={color} />;
};

export const IconAccessTime = ({ size, color }: IconProps) => {
  return <AccessTimeIcon fontSize={size} color={color} />;
};

export const IconFlag = ({ size, color }: IconProps) => {
  return <FlagIcon fontSize={size} color={color} />;
};

export const IconArrowBackIos = ({ size, color }: IconProps) => {
  return <ArrowBackIosIcon fontSize={size} color={color} />;
};

export const IconArrowForwardIos = ({ size, color }: IconProps) => {
  return <ArrowForwardIosIcon fontSize={size} color={color} />;
};
