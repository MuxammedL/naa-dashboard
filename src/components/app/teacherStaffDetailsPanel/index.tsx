import { Drawer, DrawerCloser, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { DrawerKey } from "@/enum/DrawerKey";
import { useDrawerController } from "@/hooks/useDrawerController";
import { TeacherService } from "@/services/TeacherService";
import type { TeacherDetailTabValue, TeacherDTO } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import styles from "./details.module.css"
import Label from "@/components/ui/Label";
import { useEffect, useState } from "react";
import { teacherDetailTabs } from "@/constant/teacherDetailTabs";
import { Icons } from "@/assets";
import InfoRow from "@/components/ui/InfoRow";
import { getStatusVariant } from "@/lib/utils";

const TeacherStaffDetailsPanel = () => {
    const { isDrawerOpen, closeDrawer, activeID } = useDrawerController();
    const [activeTab, setActiveTab] = useState<TeacherDetailTabValue>("personalInformation")
    const [expandedSections, setExpandedSections] = useState<number[]>([0]);
    const isOpen = isDrawerOpen(DrawerKey.TEACHERSTAFFDETAIL);
    const {
        data: teacher,
        isLoading,
        error
    } = useQuery<TeacherDTO | null>({
        queryKey: [activeID],
        queryFn: async () => {
            const res = await TeacherService.getTeacherById(activeID);
            return res;
        }
    })

    const toggleSection = (index: number) => {
        setExpandedSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    useEffect(() => {
        if (isOpen) {
            setActiveTab("personalInformation");
            setExpandedSections([0, 2, 3]);
        }
    }, [isOpen]);

    return (
        <Drawer open={isOpen} onOpenChange={(v) => !v && closeDrawer(DrawerKey.TEACHERSTAFFDETAIL)} side="right" className="w-[600px]">
            <DrawerTitle>
                <h5 className={styles.drawerTitle}>Müəllim məlumatları</h5>
                <DrawerCloser />
            </DrawerTitle>
            <DrawerContent>
                {error ?
                    <div className="flex flex-col w-full items-center justify-center min-h-[200px]">
                        <span className="text-red-500">
                            {error instanceof Error ? error.message : "Xəta baş verdi"}
                        </span>
                    </div>
                    : isLoading ?
                        <div className="flex flex-col gap-4 h-full w-full">
                            <div className={styles.header}>
                                <div className={`${styles.avatarContainer} loading-state`}></div>
                                <div className={styles.headerContent}>
                                    <div className={styles.headerContentTop}>
                                        <div className="h-6 loading-state w-48 rounded-md"></div>
                                        <div className="h-6 loading-state w-20 rounded-md"></div>
                                    </div>
                                    <div className={styles.headerContentBottom}>
                                        <div className="h-[22px] loading-state w-20 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className={styles.tabs}></div>
                                <div className="rounded-lg inset-0 absolute w-full h-full loading-state"></div>
                            </div>
                            <div className="loading-state h-full rounded-md w-full"></div>
                        </div>
                        : teacher == undefined ?
                            <div className="grid place-items-center h-full">
                                <span className="text-xl">Müəllim tapilmadi</span>
                            </div>
                            :
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    <div className={styles.header}>
                                        <div className={styles.avatarContainer}>
                                            <img className={styles.avatar} src={teacher?.avatar} alt={teacher.fullName} />
                                        </div>
                                        <div className={styles.headerContent}>
                                            <div className={styles.headerContentTop}>
                                                <h6 className={styles.teacherTitle}>{teacher?.fullName}</h6>
                                                <Label variant={getStatusVariant(teacher.status)}>{teacher.status}</Label>
                                            </div>
                                            <div className={styles.headerContentBottom}>
                                                <Label variant="ghost" size="small" className="w-fit">
                                                    {teacher.academicInformation.positionType}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className={styles.tabs}>
                                        </div>
                                        <ul className="flex gap-0.5 justify-between inset-0 absolute w-full h-full">
                                            {teacherDetailTabs.map((tab, index) => (
                                                <button key={index} onClick={() => setActiveTab(tab.value)}
                                                    className={`${styles.tab} ${activeTab == tab.value ? styles.active : ""}`}>
                                                    <tab.icon width={20} height={20} />
                                                    <span className={styles.tabText}>{tab.title}</span>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-10">
                                    {activeTab === 'personalInformation' && (
                                        <>
                                            <div>
                                                <button
                                                    onClick={() => toggleSection(0)}
                                                    type="button"
                                                    className={styles.dropdownToggle}
                                                >
                                                    <div className="flex items-center gap-2 text-text-color">
                                                        <Icons.user width={20} height={20} />
                                                        <span className="label1 font-semibold">Şəxsi məlumatlar</span>
                                                    </div>
                                                    <Icons.chevronDown width={20} height={20} className={`${styles.chevronDown} ${expandedSections.includes(0) ? "rotate-180" : ""}`} />
                                                </button>

                                                <div className={`${styles.dropdownItems} ${expandedSections.includes(0) ? styles.active : ""}`}>
                                                    <div className="overflow-hidden">
                                                        <ul className="space-y-[10px] mt-5">
                                                            <InfoRow label="Ad" value={teacher.personalInformation.name} />
                                                            <InfoRow label="Soyad" value={teacher.personalInformation.surname} />
                                                            <InfoRow label="Ata adı" value={teacher.personalInformation.fatherName} />
                                                            <InfoRow label="Cinsi" value={teacher.personalInformation.gender} />
                                                            <InfoRow label="Doğum tarixi" value={(teacher.personalInformation.birthDate)} />
                                                            <InfoRow label="ŞV seriya" value={teacher.personalInformation.idSeries} />
                                                            <InfoRow label="ŞV nömrə" value={teacher.personalInformation.idNumber} />
                                                            <InfoRow label="Finkod" value={teacher.personalInformation.fincode} />
                                                            <InfoRow label="İstifadəçi adı" value={teacher.personalInformation.username} />
                                                            <InfoRow label="Vətəndaşlıq" value={teacher.personalInformation.citizenship} />
                                                            <InfoRow label="Sosial statusu" value={teacher.personalInformation.socialStatus} />
                                                            <InfoRow label="Sosial vəziyyəti" value={teacher.personalInformation.socialCondition} />
                                                            <InfoRow label="Ailə vəziyyəti" value={teacher.personalInformation.maritalStatus} />
                                                            <InfoRow label="Hərbi status" value={teacher.personalInformation.militaryStatus} />
                                                            <InfoRow label="Əlillik status" value={teacher.personalInformation.disabilityStatus} />
                                                            <InfoRow label="İşə başlama tarixi" value={(teacher.personalInformation.employmentStartDate)} />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() => toggleSection(1)}
                                                    className={styles.dropdownToggle}
                                                    type="button"
                                                >
                                                    <div className="flex items-center gap-2 text-text-color">
                                                        <Icons.phone width={20} height={20} />
                                                        <span className="label1 font-semibold">Əlaqə məlumatları</span>
                                                    </div>
                                                    <Icons.chevronDown width={20} height={20} className={`${styles.chevronDown} ${expandedSections.includes(1) ? "rotate-180" : ""}`} />
                                                </button>

                                                <div className={`${styles.dropdownItems} ${expandedSections.includes(1) ? styles.active : ""}`}>
                                                    <div className="overflow-hidden">
                                                        <ul className="space-y-[10px] mt-5">
                                                            <InfoRow label="Mobil nömrə" value={teacher.contactInformation.mobileNumber} />
                                                            <InfoRow label="Daxili nömrə" value={teacher.contactInformation.internalNumber} />
                                                            <InfoRow label="Ünvan" value={teacher.contactInformation.address} />
                                                            <InfoRow label="E-poçt" value={teacher.contactInformation.email} />
                                                            <InfoRow label="Qeydiyyat Ünvanı" value={teacher.contactInformation.registrationAddress} />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {activeTab === 'academicInformation' && (
                                        <>
                                            <div>
                                                <button
                                                    onClick={() => toggleSection(2)}
                                                    type="button"
                                                    className={styles.dropdownToggle}
                                                >
                                                    <div className="flex items-center gap-2 text-text-color">
                                                        <Icons.graduationHat width={20} height={20} />
                                                        <span className="label1 font-semibold">Əlaqə məlumatları</span>
                                                    </div>
                                                    <Icons.chevronDown width={20} height={20} className={`${styles.chevronDown} ${expandedSections.includes(2) ? "rotate-180" : ""}`} />
                                                </button>

                                                <div className={`${styles.dropdownItems} ${expandedSections.includes(2) ? styles.active : ""}`}>
                                                    <div className="overflow-hidden">
                                                        <ul className="space-y-[10px] mt-5">
                                                            <InfoRow label="Müəllimin əsas kafedrası" value={teacher.academicInformation.department} />
                                                            <InfoRow label="Elmi dərəcə" value={teacher.academicInformation.academicDegree} />
                                                            <InfoRow label="Elmi ad" value={teacher.academicInformation.academicTitle} />
                                                            <InfoRow label="Maksimal saat" value={String(teacher.academicInformation.maxHours)} />
                                                            <InfoRow label="Ştat vahidi" value={teacher.academicInformation.employmentType} />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => toggleSection(3)}
                                                    className={styles.dropdownToggle}
                                                >
                                                    <div className="flex items-center gap-2 text-text-color">
                                                        <Icons.language width={20} height={20} />
                                                        <span className="label1 font-semibold">Dil bilikləri</span>
                                                    </div>
                                                    <Icons.chevronDown width={20} height={20} className={`${styles.chevronDown} ${expandedSections.includes(3) ? "rotate-180" : ""}`} />
                                                </button>

                                                <div className={`${styles.dropdownItems} ${expandedSections.includes(3) ? styles.active : ""}`}>
                                                    <div className="overflow-hidden">
                                                        <ul className="space-y-[10px] mt-5">
                                                            <li className="flex items-start justify-between">
                                                                <span className="label1 text-sidebar-text-color font-semibold">
                                                                    Tədris apardığı dillər
                                                                </span>

                                                                <div className="flex flex-wrap gap-2 label1 text-secondary-text-color font-medium">
                                                                    {teacher.academicInformation.languagesTaught.map((item, idx) => (
                                                                        <Label variant="ghost" key={idx} size="small">
                                                                            {item}
                                                                        </Label>
                                                                    ))}
                                                                </div>
                                                            </li>
                                                            <li className="flex items-start justify-between">
                                                                <span className="label1 text-sidebar-text-color font-semibold">
                                                                    Xarici dil bilikləri
                                                                </span>

                                                                <div className="flex flex-wrap gap-2 label1 text-secondary-text-color font-medium">
                                                                    {teacher.academicInformation.foreignLanguages.map((item, idx) => (
                                                                        <span key={idx}>
                                                                            {item.language}
                                                                            {item.level && item.level !== "-" ? ` (${item.level})` : ""}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {activeTab === 'subjects' && (
                                        <div>
                                            <div
                                                className={styles.dropdownToggle}
                                            >
                                                <div className="flex items-center gap-2 text-text-color">
                                                    <Icons.bookOpen width={20} height={20} />
                                                    <span className="label1 font-semibold">Tədris etdiyi fənlər</span>
                                                </div>
                                            </div>

                                            <ul className="space-y-[10px] mt-5">
                                                {teacher.subjects.map((subject, index) => (
                                                    <li key={index} className="label1 text-secondary-text-color font-medium">
                                                        {index + 1}. {subject}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activeTab === 'files' && (
                                        <div>
                                            <div
                                                className={styles.dropdownToggle}
                                            >
                                                <div className="flex items-center gap-2 text-text-color">
                                                    <Icons.file width={20} height={20} />
                                                    <span className="label1 font-semibold">Diplomlar və sertifikatlar</span>
                                                </div>
                                            </div>

                                            <ul className="space-y-[10px] mt-5">
                                                {teacher.files.map((file, index) => (
                                                    <li key={index}>
                                                        <a href="./file.pdf" className={styles.file} target="_blank">
                                                            <div className="flex items-center gap-2">
                                                                {(() => {
                                                                    switch (file.type) {
                                                                        case "Word":
                                                                            return (
                                                                                <div className={styles.wordIcon}>
                                                                                    <Icons.file width={20} height={20} />
                                                                                </div>
                                                                            );
                                                                        case "PDF":
                                                                            return <Icons.pdf width={40} height={40} />;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                })()}
                                                                <div className="flex flex-col gap-1 text-text-color">
                                                                    <span className="label1 font-semibold">{file.name}</span>
                                                                    <span className="text-[12px] leading-[18px]">
                                                                        {file.type} | {file.size}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Icons.arrowCircle width={20} height={20} className={styles.arrowCircle} />
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div >
                }
            </DrawerContent >
        </Drawer >
    );
}

export default TeacherStaffDetailsPanel