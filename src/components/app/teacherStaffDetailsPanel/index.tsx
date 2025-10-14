import { Drawer, DrawerCloser, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { DrawerKey } from "@/enum/DrawerKey";
import { useDrawerController } from "@/hooks/useDrawerController";
import { TeacherSerivce } from "@/services/TeacherService";
import type { TeacherDetailTabValue, TeacherDTO } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import styles from "./details.module.css"
import Label from "@/components/ui/Label";
import { useState } from "react";
import { teacherDetailTabs } from "@/constant/teacherDetailTabs";

const TeacherStaffDetailsPanel = () => {
    const { isDrawerOpen, closeDrawer, activeID } = useDrawerController();
    const [activeTab, setActiveTab] = useState<TeacherDetailTabValue>("personalInformation")
    // const [expandedSections, setExpandedSections] = useState<number[]>([0]);
    const isOpen = isDrawerOpen(DrawerKey.TEACHERSTAFFDETAIL);
    const {
        data: teacher,
        isLoading,
        error
    } = useQuery<TeacherDTO | null>({
        queryKey: [activeID],
        queryFn: async () => {
            const res = await TeacherSerivce.getTeacherById(activeID);
            return res;
        }
    })

    // const toggleSection = (index: number) => {
    //     setExpandedSections(prev =>
    //         prev.includes(index)
    //             ? prev.filter(i => i !== index)
    //             : [...prev, index]
    //     );
    // };

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
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className={styles.header}>
                                    <div className={`${styles.avatarContainer} bg-gray-300 animate-pulse`}>
                                    </div>
                                    <div className={styles.headerContent}>
                                        <div className={styles.headerContentTop}>
                                            <div className="h-6 bg-gray-300 animate-pulse w-48 rounded-md"></div>
                                            <div className="h-6 bg-gray-300 animate-pulse w-20 rounded-md"></div>
                                        </div>
                                        <div className={styles.headerContentBottom}>
                                            <div className="h-[22px] bg-gray-300 animate-pulse w-20 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className={styles.tabs}>
                                    </div>
                                    <ul className="rounded-lg inset-0 absolute w-full h-full bg-gray-300 animate-pulse">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        : teacher == undefined ?
                            <div>
                                <span>Müəllim tapilmadi</span>
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
                                                <Label variant={
                                                    teacher.status === "Əmr var" ? "success" :
                                                        teacher.status === "Əmr gözləyir" ? "warning" :
                                                            "error"
                                                }>{teacher.status}</Label>
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
                                {/* <div>
                                    {activeTab === 'personalInformation' && (
                                        <div>
                                            <div className="mb-4">
                                                <button
                                                    onClick={() => toggleSection(0)}
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3"
                                                >
                                                    <Icons.user width={20} height={20} />
                                                    <span>Şəxsi məlumatlar</span>
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${expandedSections.includes(0) ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {expandedSections.includes(0) && (
                                                    <div className="space-y-2">
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
                                                        <InfoRow label="Hərbi status" value={teacher.personalInformation.militaryStatus} />
                                                        <InfoRow label="Əlillik status" value={teacher.personalInformation.disabilityStatus} />
                                                        <InfoRow label="İşə başlama tarixi" value={(teacher.personalInformation.employmentStartDate)} />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() => toggleSection(1)}
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>Əlaqə məlumatları</span>
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${expandedSections.includes(1) ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {expandedSections.includes(1) && (
                                                    <div className="space-y-2">
                                                        <InfoRow label="Mobil nömrə" value={teacher.contactInformation.mobileNumber} />
                                                        <InfoRow label="Daxili nömrə" value={teacher.contactInformation.internalNumber} />
                                                        <InfoRow label="Ünvan" value={teacher.contactInformation.address} />
                                                        <InfoRow label="Qeydiyyat" value={teacher.contactInformation.registrationNumber} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'academicInformation' && (
                                        <div className="text-center py-8 text-gray-500">
                                            Akademik məlumat bölməsi
                                        </div>
                                    )}

                                    {activeTab === 'subjects' && (
                                        <div className="text-center py-8 text-gray-500">
                                            Fənlər bölməsi
                                        </div>
                                    )}

                                    {activeTab === 'files' && (
                                        <div className="text-center py-8 text-gray-500">
                                            Sənədlər bölməsi
                                        </div>
                                    )}
                                </div> */}
                            </div>
                }
            </DrawerContent>
        </Drawer >
    );
}

export default TeacherStaffDetailsPanel