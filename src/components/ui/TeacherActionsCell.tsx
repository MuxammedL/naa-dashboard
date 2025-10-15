import { useDrawerController } from '@/hooks/useDrawerController';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { Icons } from '@/assets';
import { DrawerKey } from '@/enum/DrawerKey';
import type { TeacherActionsCellProps } from '@/types/props';

const TeacherActionsCell = ({ teacherID }: TeacherActionsCellProps) => {
    const { openDrawer, setActiveID } = useDrawerController();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="h-6 w-6 grid place-items-center cursor-pointer focus:outline-secondary" type='button'>
                    <Icons.dotsVertical width={20} height={20} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-[248px] gap-0.5 flex flex-col"
            >
                <DropdownMenuItem onClick={() => { openDrawer(DrawerKey.TEACHERSTAFFDETAIL); setActiveID(teacherID) }}>
                    <Icons.file
                        width={16}
                        height={16}
                        className="text-sidebar-icon-color"
                    />
                    Detallar
                </DropdownMenuItem>

                <DropdownMenuItem className="mb-1">
                    <Icons.edit
                        width={16}
                        height={16}
                        className="text-sidebar-icon-color"
                    />
                    Düzəliş et
                </DropdownMenuItem>

                <div className="absolute left-0 right-0 w-full h-[1px] top-[81px] bg-table-border"></div>

                <DropdownMenuItem className="text-red-600">
                    <Icons.trashBin width={16} height={16} />
                    Sil
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TeacherActionsCell