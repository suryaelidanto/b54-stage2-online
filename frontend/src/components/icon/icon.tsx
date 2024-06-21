import { IconProps } from "../../types/types";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaHome,
  FaSearch,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaComment,
} from "react-icons/fa";

function Icon({ icon: IconComponent, fontSize, color }: IconProps) {
  return <IconComponent fontSize={fontSize} color={color} />;
}

export function GithubIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaGithub} {...props} />;
}

export function LinkedinIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaLinkedin} {...props} />;
}

export function FacebookIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaFacebook} {...props} />;
}

export function InstagramIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaInstagram} {...props} />;
}

export function HomeIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaHome} {...props} />;
}

export function SearchIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaSearch} {...props} />;
}

export function LoveIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaHeart} {...props} />;
}

export function UserIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaUser} {...props} />;
}

export function LogoutIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaSignOutAlt} {...props} />;
}

export function CommentIcon(props: Omit<IconProps, "icon">) {
  return <Icon icon={FaComment} {...props} />;
}
