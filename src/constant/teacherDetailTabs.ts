import { Icons } from "@/assets";
import type { TeacherDetailTab } from "@/types/types";

export const teacherDetailTabs: TeacherDetailTab[] = [
  {
    title: "Şəxsi məlumat",
    icon: Icons.user,
    value: "personalInformation",
  },
  {
    title: "Akademik məlumat",
    icon: Icons.graduationHat,
    value: "academicInformation",
  },
  {
    title: "Fənlər",
    icon: Icons.bookOpen,
    value: "subjects",
  },
  {
    title: "Sənədlər",
    icon: Icons.file,
    value: "files",
  },
];
