import type { SVGProps, JSX } from "react";

export type LanguageCode = "en" | "az" | "ru";

export type Language = {
  code: LanguageCode;
  name: string;
};

export type SidebarLink = {
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  href?: string;
  items?: {
    name: string;
    href?: string;
  }[];
};
