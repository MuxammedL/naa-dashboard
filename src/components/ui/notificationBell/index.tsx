import { Icons } from "@/assets"

const NotificationBell = () => {
    return (
        <button
            type="button"
            aria-label="Notification"
            title="Notification"
            className="header-buttons"
        >
            <Icons.bell aria-hidden="true" width={20} height={20} />
            <span className="sr-only">Notification</span>
        </button>
    )
}

export default NotificationBell