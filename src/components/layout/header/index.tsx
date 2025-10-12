import styles from "./header.module.css";


const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <img src="./logo.png" className={styles.logo} width={163} height={40} />
            </nav>
        </header>
    )
}

export default Header