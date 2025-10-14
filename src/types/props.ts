import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { DrawerSide, LabelVariant } from "./types";

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

export interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
}

export interface DrawerTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface DrawerTitleProps {
  children: React.ReactNode;
}

export interface DrawerCloserProps {
  children?: React.ReactNode;
}

export interface DrawerContentProps {
  children: React.ReactNode;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
}
