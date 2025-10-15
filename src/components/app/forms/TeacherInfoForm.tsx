import Label from "@/components/ui/Label"
import { getStatusVariant } from "@/lib/utils"
import type { TeacherDTO } from "@/types/types"
import styles from "./teacherInfoForm.module.css"
import { Icons } from "@/assets"
import { useState } from "react"
import Button from "@/components/ui/Button"

const TeacherInfoForm = ({ teacher, type }: { teacher: TeacherDTO, type: "edit" | "add" }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const steps = ["Şəxsi məlumatlar", "Akademik məlumatlar", "Tədris etdiyi fənlər"]
    const increaseTabIndex = () => {
        setActiveIndex(activeIndex + 1)
    }

    const decreaseTabIndex = () => {
        setActiveIndex(activeIndex - 1)
    }

    function handleSaveForm(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className={styles.headerInfo}>
                <div className={styles.avatarContainer}>
                    <img className={styles.avatar} src={teacher?.avatar} alt={teacher.fullName} />
                </div>
                <div className={styles.headerContent}>
                    <h6 className={styles.teacherTitle}>{teacher?.fullName}</h6>
                    <Label variant={getStatusVariant(teacher.status)}>{teacher.status}</Label>
                </div>
            </div>
            <div className={styles["sidebar-form"]}>
                <div className={styles.sidebar}>
                    <ul className="flex flex-col">
                        {steps.map((item, index) => (
                            <li>
                                <div className={`${styles.step} ${activeIndex == index ? styles.active : ""}`}>
                                    <div className="relative">
                                        <div className={`${styles.dot}`}>
                                            <Icons.doneStep width={24} height={24} className={`${styles.icon} ${activeIndex > index ? styles.active : ""}`} />
                                            <Icons.activeStep width={24} height={24} className={`${styles.icon} ${activeIndex == index ? styles.active : ""}`} />
                                            <Icons.step width={24} height={24} className={`${styles.icon} ${activeIndex < index ? styles.active : ""}`} />
                                        </div>
                                    </div>
                                    <span>{item}</span>
                                </div>
                                <div className={`w-6 h-[22px] py-1 flex justify-center ${steps.length - 1 == index ? "hidden" : ""}`}>
                                    <span className={`${styles.line} ${activeIndex > index ? styles.active : ""}`}>
                                        <span className={styles.lineInner}></span>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="h-full flex flex-col gap-6 w-full">
                    <div className="h-full border border-light-gray rounded-lg">
                        {type}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            className={activeIndex > 0 ? "" : "opacity-0 invisible"}
                            handleClick={() => decreaseTabIndex()}>
                            <Icons.leftArrow width={24} height={24} />
                            <span>Geri</span>
                        </Button>
                        <Button
                            handleClick={() => increaseTabIndex()}
                            className={activeIndex <= 1 ? "" : "opacity-0 invisible hidden"}>
                            <span>İrəli</span>
                            <Icons.leftArrow className="rotate-180" width={24} height={24} />
                        </Button>
                        <Button
                            handleClick={() => handleSaveForm()}
                            variant="primary"
                            className={activeIndex > 1 ? "" : "opacity-0 invisible hidden"}>

                            <span>Əlavə et</span>
                            <Icons.done width={24} height={24} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherInfoForm