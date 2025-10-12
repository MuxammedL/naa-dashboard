import { Icons } from "@/assets";
import type { SidebarLink } from "@/types/types";

export const sidebarLinks: SidebarLink[] = [
  {
    name: "İstifadəçilər",
    icon: Icons.users,
    items: [
      {
        name: "User1",
      },
      {
        name: "User2",
      },
    ],
  },
  {
    name: "Soraqçalar",
    icon: Icons.fileText,
    href: "/questions",
  },
  {
    name: "Sorğular",
    icon: Icons.folder,
    href: "/surveys",
  },
  {
    name: "Müəssisənin Strukturu",
    icon: Icons.barChart,
    items: [
      {
        name: "Fakültələr",
      },
      {
        name: "Kafedralar",
      },
      {
        name: "Tələbələr",
      },
    ],
  },
  {
    name: "Fənlərin menecmenti",
    icon: Icons.stand,
    items: [
      {
        name: "Fənlər",
      },
      {
        name: "İxtisaslar",
      },
    ],
  },
  {
    name: "Tədris yükü",
    icon: Icons.backPack,
    items: [
      {
        name: "Qrup planı",
      },
      {
        name: "Tədris tapşırıqları",
      },
      {
        name: "Mühazirə birləşməsi",
      },
      {
        name: "Tədris yükü",
      },
      {
        name: "Professor - müəllim heyəti",
        href: "/muellim-heyeti",
      },
    ],
  },
  {
    name: "Tədbirlər və Elanlar",
    icon: Icons.announcement,
    items: [
      {
        name: "Tədbirlər",
      },
      {
        name: "Elanlar",
      },
    ],
  },
];
