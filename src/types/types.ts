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

export type LabelVariant =
  | "success"
  | "warning"
  | "blue"
  | "purple"
  | "error"
  | "ghost";

export type PersonalInformation = {
  name: string;
  surname: string;
  fatherName: string;
  gender: string;
  birthDate: string;
  idSeries: string;
  idNumber: string;
  fincode: string;
  username: string;
  citizenship: string;
  socialStatus: string;
  socialCondition: string;
  maritalStatus: string;
  militaryStatus: string;
  disabilityStatus: string;
  employmentStartDate: string;
};

export type ContactInformation = {
  mobileNumber: string;
  internalNumber: string;
  address: string;
  registrationAddress: string;
  email: string;
};

export type ForeignLanguage = {
  language: string;
  level: string;
};

export type AcademicInformation = {
  department: string;
  academicDegree: string;
  academicTitle: string;
  maxHours: number;
  positionType: string;
  employmentType: string;
  languagesTaught: string[];
  foreignLanguages: ForeignLanguage[];
};

export type FileInfo = {
  name: string;
  type: string;
  size?: string;
};

export type TeacherDTO = {
  id: number;
  avatar: string;
  personalInformation: PersonalInformation;
  contactInformation: ContactInformation;
  academicInformation: AcademicInformation;
  subjects: string[];
  files: FileInfo[];
  status: string;
  fullName: string;
};

export type DrawerSide = "right" | "left" | "top" | "bottom";

export interface DrawerContextType {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  side: DrawerSide;
}

export type TeacherDetailTabValue =
  | "personalInformation"
  | "academicInformation"
  | "subjects"
  | "files";

export type TeacherDetailTab = {
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  value: TeacherDetailTabValue;
};
