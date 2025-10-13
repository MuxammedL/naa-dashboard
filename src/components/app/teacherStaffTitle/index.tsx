import { Icons } from "@/assets"
import styles from "./teacherStaffTitle.module.css"
import Button from "@/components/ui/Button"

const TeacherStaffTitle = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <h3 className={styles.title}>Professor - müəllim heyəti</h3>
                    <p className={styles.description}>
                        Müəllim heyətinin idarə edilməsi və tədris yükünün təyin edilməsi.
                    </p>
                </div>
                <div className={styles.btnsWrapper}>
                    <Button variant="secondary" className={styles.btnSecondary}>
                        <Icons.calendarPlus width={20} height={20} />
                        <span className={styles.btnText}>
                            Növbəti il üçün hazırlıq
                        </span>
                    </Button>
                    <Button>
                        <Icons.calendar width={20} height={20} />
                        <span className={styles.btnText}>
                            2024 - 2025
                        </span>
                        <Icons.chevronDown width={20} height={20} />
                    </Button>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}

export default TeacherStaffTitle