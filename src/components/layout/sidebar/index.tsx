import { Icons } from "@/assets";
import styles from "./sidebar.module.css";
import SidebarFooter from "@/components/ui/sidebarFooter";
import { sidebarLinks } from "@/constant/sidebarLinks";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const pathname = useLocation();
    const [activeSidebar, setActiveSidebar] = useState(true)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggleDropdown = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const toggleSidebar = () => {
        setActiveSidebar((prev) => !prev)
    }

    useEffect(() => {
        if (activeIndex !== null) {
            setActiveSidebar(true);
        }
    }, [activeIndex]);

    useEffect(() => {
        if (!activeSidebar) {
            setActiveIndex(null);
        }
    }, [activeSidebar]);

    return (
        <aside className={`${styles.sidebar} ${activeSidebar ? styles.active : ""}`}>
            <button className={styles.toggleButton} onClick={toggleSidebar}>
                <Icons.sidebar width={20} height={20} />
            </button>
            <nav className={styles.nav}>
                <ul className={styles.linkItems}>
                    {sidebarLinks.map((link, index) => (
                        <li key={index}>
                            {
                                link.href
                                    ?
                                    <Link to={link.href} className={`${styles.link} ${pathname.pathname === link.href ? styles.active : ""}`}>
                                        <link.icon width={20} height={20} className="shrink-0" />
                                        <span className={styles.linkText}>{link.name}</span>
                                    </Link>
                                    :
                                    <div
                                        className={`${styles.link} ${styles.dropdown}`}
                                        onClick={() => handleToggleDropdown(index)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <link.icon width={20} height={20} className="shrink-0" />
                                            <span className={styles.linkText}>{link.name}</span>
                                        </div>
                                        {link.items && <Icons.chevronDown width={16} height={16} className={`${styles.icon} ${activeIndex === index ? "rotate-180" : ""}`} />}
                                    </div>
                            }
                            {link.items && (
                                <div className={`${styles.dropdownItems} ${activeIndex === index ? styles.active : ""}`}>
                                    <div className="overflow-hidden">
                                        <ul className="flex flex-col gap-1">
                                            {
                                                link.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        {item.href ?
                                                            <Link to={item.href} className={`${styles.dropdownItem} ${pathname.pathname === item.href ? styles.active : ""}`}>
                                                                <span className={styles.linkText}>{item.name}</span>
                                                            </Link>
                                                            :
                                                            <div className={`${styles.dropdownItem} ${pathname.pathname === link.href ? styles.active : ""}`}>
                                                                <span className={styles.linkText}>{item.name}</span>
                                                            </div>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <SidebarFooter activeSidebar={activeSidebar} />
        </aside>
    )
}

export default Sidebar