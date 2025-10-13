import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  variant?: "success" | "warning" | "blue" | "purple" | "error";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  className?: string;
}
