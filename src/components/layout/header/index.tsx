import { Link } from "react-router-dom";
import styles from "./header.module.css";
import LanguageSelector from "@/components/ui/languageSelector";
import FilesButton from "@/components/ui/filesButton";
import AppGridMenu from "@/components/ui/appGridMenu";
import NotificationBell from "@/components/ui/notificationBell";
import ProfileButton from "@/components/ui/profileButton";


const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <Link to={"/"}>
                    <img src="./logo.svg" className={styles.logo} width={163} height={40} />
                </Link>
                <div className={styles.wrapper}>
                    <LanguageSelector />
                    <div className="flex gap-2 mx-2">
                        <FilesButton />
                        <AppGridMenu />
                        <NotificationBell />
                    </div>
                    <ProfileButton />
                </div>
            </nav>
        </header>
    )
}

export default Header