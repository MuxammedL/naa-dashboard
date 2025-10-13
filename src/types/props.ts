import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LabelVariant } from "./types";

export interface SidebarFooterProps {
  activeSidebar?: boolean;
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  handleClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  href?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerClass?: string;
}

export interface LabelProps {
  variant?: LabelVariant;
  size?: "small" | "medium" | "large";
  children: ReactNode;
  className?: string;
}
