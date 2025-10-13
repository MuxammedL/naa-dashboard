import { Icons } from "@/assets"
import styles from "./teacherStaffControls.module.css"
import Button from "@/components/ui/Button"
import Label from "@/components/ui/Label"

const TeacherStaffControls = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <p className={styles.title}>Tədris yükü statusu</p>
                <Label variant="warning">Təsdiq gözləyir</Label>
            </div>
            <div className={styles.btnsWrapper}>
                <div className={styles.searchInput}>
                    <Icons.search width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2" />
                    <input className={styles.input} name="filter" type="text" placeholder="Ad, soyad və ya Fin ilə axtar..." />
                </div>
                <Button className={styles.btn}>
                    <Icons.userPlus width={20} height={20} />
                    <span className={styles.btnText}>
                        Müəllim əlavə et
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default TeacherStaffControls