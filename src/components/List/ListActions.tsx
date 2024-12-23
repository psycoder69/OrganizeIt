import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";
import { HorizontalEllipsis, TrashCan } from "../Icons";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const ListActions = ({ listId }: { listId: string }) => {
    const [isListTooltipOpen, setIsListTooltipOpen] = useState(false);
    const [isListActionsOpen, setListActionsOpen] = useState(false);

    const { deleteList, clearList, setActiveListEdit } = useTaskBoardStore();

    const handleOnDropdownOpenChange = (open: boolean) => {
        setIsListTooltipOpen(false);
        setListActionsOpen(open)
    };

    return (
        <TooltipProvider>
            <Tooltip open={isListTooltipOpen && !isListActionsOpen}>
                <TooltipTrigger asChild onMouseOver={() => setIsListTooltipOpen(true)} onMouseOut={() => setIsListTooltipOpen(false)}>
                    <div className="rounded-full p-1 hover:bg-gray-200 cursor-pointer">
                        <DropdownMenu onOpenChange={(open) => handleOnDropdownOpenChange(open)}>
                            <DropdownMenuTrigger asChild>
                                <span>
                                    <HorizontalEllipsis className="size-[18px]" />
                                </span>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="right" align="start" alignOffset={6} sideOffset={12} className="rounded-lg">
                                <DropdownMenuItem role="button" className="!p-0">
                                    <button type="button" onClick={() => setActiveListEdit(listId, false)} className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-blue-400">
                                        <Pencil className="size-3.5" />
                                        Edit Title
                                    </button>
                                </DropdownMenuItem>

                                <DropdownMenuItem role="button" className="!p-0">
                                    <button type="button" onClick={() => clearList(listId)} className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-red-400">
                                        <TrashCan className="size-4" />
                                        Clear List
                                    </button>
                                </DropdownMenuItem>
    
                                <DropdownMenuSeparator />

                                <DropdownMenuItem role="button" className="!p-0">
                                    <button type="button" onClick={() => deleteList(listId)} className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-red-400">
                                        <TrashCan className="size-4" />
                                        Delete List
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TooltipTrigger>

                <TooltipContent aria-disabled={isListActionsOpen}>
                    List actions
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ListActions;