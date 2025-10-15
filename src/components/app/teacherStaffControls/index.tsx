import { Icons } from "@/assets"
import styles from "./teacherStaffControls.module.css"
import Button from "@/components/ui/Button"
import Label from "@/components/ui/Label"
import TeacherSearchPanel from "../teacherSearchPanel"
import { useCallback, useState } from "react"

const TeacherStaffControls = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handlePanelVisibility = useCallback((value: boolean) => {
        setIsOpen(value)
    }, [])

    return (
        <>
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
                    <Button variant="primary" handleClick={() => setIsOpen(true)}>
                        <Icons.userPlus width={20} height={20} />
                        <span className={styles.btnText}>
                            Müəllim əlavə et
                        </span>
                    </Button>
                </div>
            </div>
            <TeacherSearchPanel open={isOpen} onOpenChange={handlePanelVisibility} />
        </>
    )
}

export default TeacherStaffControls