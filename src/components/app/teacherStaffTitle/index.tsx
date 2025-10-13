import { Icons } from "@/assets"
import styles from "./teacherStaffTitle.module.css"

const TeacherStaffTitle = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <h3 className={styles.title}>Professor - müəllim heyəti</h3>
                <p className={styles.description}>
                    Müəllim heyətinin idarə edilməsi və tədris yükünün təyin edilməsi.
                </p>
            </div>
            <div className={styles.btnsWrapper}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <Icons.calendarPlus width={20} height={20} />
                    <span className={styles.btnText}>
                        Növbəti il üçün hazırlıq
                    </span>
                </button>
                <button className={`${styles.btn}`}>
                    <Icons.calendar width={20} height={20} />
                    <span className={styles.btnText}>
                        2024 - 2025
                    </span>
                    <Icons.chevronDown width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default TeacherStaffTitle