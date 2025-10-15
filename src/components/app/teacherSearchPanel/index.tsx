import { Icons } from "@/assets"
import styles from "./teacherSearchPanel.module.css"
import Button from "@/components/ui/Button"
import { TeacherSearchTable } from "@/components/ui/teacherSearchTable"
import { columns } from "@/components/ui/teacherSearchTable/columns"
import { useCallback, useState } from "react"
import type { TeacherDTO } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { TeacherService } from "@/services/TeacherService"
import type { TeacherSearchPanelProps } from "@/types/props"

const TeacherSearchPanel = ({ open, onOpenChange }: TeacherSearchPanelProps) => {
    const [teachers, setTeachers] = useState<TeacherDTO[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [hasSearched, setHasSearched] = useState(false)

    const searchMutation = useMutation({
        mutationFn: (query: string) => TeacherService.getTeachersByFinNameSurname(query),
        onSuccess: (data) => {
            setTeachers(data)
            setHasSearched(true)
        },
        onError: (error) => {
            console.error("Error fetching teachers:", error)
            setTeachers([])
            setHasSearched(true)
        }
    })

    const handleSearch = useCallback(() => {
        if (searchQuery.trim()) searchMutation.mutate(searchQuery)
    }, [searchQuery, searchMutation])


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleClose = (value: boolean) => {
        setSearchQuery("")
        setTeachers([])
        setHasSearched(false)
        onOpenChange?.(value);
    }

    return (
        <div className={`${styles.container} ${open ? styles.active : ""}`}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <div className={styles.titleLeftSide}>
                        <Icons.userPlus width={20} height={20} />
                        <h5 className="label2 font-semibold">Yeni müəllim əlavə et</h5>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={() => handleClose(false)}>
                        <Icons.x width={20} height={20} />
                    </button>
                </div>
                <div className={styles["search-bar"]}>
                    <div className={styles["search-bar-left-side"]}>
                        <div className={styles.searchInput}>
                            <Icons.search width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-icon-color" />
                            <input
                                className={styles.input}
                                name="search-teacher-by-id"
                                type="text"
                                placeholder="Fin, ad və ya soyadı daxil edin"
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className={styles.info}>
                            <Icons.infoCircle width={12} height={12} />
                            <p className={styles.infoText}>FIN kod ilə axtarış daha dəqiq nəticələr göstərəcək</p>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        handleClick={handleSearch}
                        disabled={!searchQuery.trim() || searchMutation.isPending}
                    >
                        <span className="text-center w-[74px]">
                            {searchMutation.isPending ? "Gözləyin..." : "Axtar"}
                        </span>
                    </Button>
                </div>

                {!hasSearched && !searchMutation.isPending && (
                    <div className={styles.entrance}>
                        <div className={styles.searchIcon}>
                            <Icons.search width={20} height={20} />
                        </div>
                        <p className="label1 text-secondary-text-color">
                            Müəllimin adını, soyadını və ya FIN kodunu daxil edərək axtarışa başlayın
                        </p>
                    </div>
                )}

                {hasSearched && (
                    <TeacherSearchTable
                        data={teachers}
                        columns={columns}
                        isLoading={searchMutation.isPending}
                    />
                )}
            </div>
        </div>
    )
}

export default TeacherSearchPanel