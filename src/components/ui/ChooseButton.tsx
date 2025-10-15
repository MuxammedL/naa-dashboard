import { Icons } from "@/assets";
import { useTeacherInfoController } from "@/hooks/useTeacherInfoController";

const ChooseButton = ({ id }: { id: number }) => {
    const { openPanel, setActiveID } = useTeacherInfoController();

    return (
        <button
            className="p-2 rounded-lg bg-milk gap-[6px] label1 font-semibold text-brand-700 flex cursor-pointer"
            onClick={() => { openPanel("add"); setActiveID(id) }}>
            <Icons.doneCircle width={20} height={20} />
            <span>Seç</span>
        </button>
    )
}
 
export default ChooseButton