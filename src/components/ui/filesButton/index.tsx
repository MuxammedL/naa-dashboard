import { Icons } from "@/assets"

const FilesButton = () => {
    return (
        <button
            type="button"
            aria-label="Files"
            title="Files"
            className="border-s border-s-[#ffffff10] header-buttons"
        >
            <Icons.file aria-hidden="true" width={20} height={20} />
            <span className="sr-only">Files</span>
        </button>
    )
}

export default FilesButton
