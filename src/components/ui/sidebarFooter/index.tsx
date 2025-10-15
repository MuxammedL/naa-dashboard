import type { SidebarFooterProps } from '@/types/props';
import styles from './sidebarFooter.module.css';

const SidebarFooter = ({ activeSidebar }: SidebarFooterProps) => {
    return (
        <button className={`${styles.footerButton} ${activeSidebar ? styles.active : ""}`} type='button'>
            <div className={styles.avatar}>
                <span className={styles.initials}>ML</span>
            </div>
            <div>
                <h6 className={styles.userName}>
                    Muxammed Layicov
                </h6>
                <p className={styles.userRole}>Tədris şöbəsi</p>
            </div>
        </button>
    )
}

export default SidebarFooter