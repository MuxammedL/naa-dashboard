import { Icons } from "@/assets"

const AppGridMenu = () => {
    return (
        <button
            type="button"
            aria-label="App Grid Menu"
            title="App Grid Menu"
            className="header-buttons"
        >
            <Icons.dotsGrid aria-hidden="true" width={20} height={20} />
            <span className="sr-only">App Grid Menu</span>
        </button>
    )
}

export default AppGridMenu 