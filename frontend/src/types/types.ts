import { IconType } from "react-icons";

export interface ButtonProps {
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  text?: string;
}

export interface IconProps {
  icon: IconType;
  fontSize?: string | number;
  color?: string;
}

export interface CardProps {
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  padding?: string | number;
  text?: string;
}
