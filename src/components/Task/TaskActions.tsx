import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HorizontalEllipsis, TrashCan, Pencil } from "../Icons";
import { useState } from "react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const TaskActions = ({ listId, taskId }: { listId: string, taskId: string }) => {
    const [isTaskTooltipOpen, setIsTaskTooltipOpen] = useState(false);
    const [isTaskActionsOpen, setTaskActionsOpen] = useState(false);

    const { deleteTask, setActiveTaskEdit } = useTaskBoardStore();

    const handleOnDropdownOpenChange = (open: boolean) => {
        setIsTaskTooltipOpen(false);
        setTaskActionsOpen(open);
    };

    return (
        <TooltipProvider>
            <Tooltip open={isTaskTooltipOpen && !isTaskActionsOpen}>
                <TooltipTrigger asChild onMouseOver={() => setIsTaskTooltipOpen(true)} onMouseOut={() => setIsTaskTooltipOpen(false)}>
                    <div className="rounded-full p-1 hover:bg-slate-100 cursor-pointer">
                        <DropdownMenu onOpenChange={(open) => handleOnDropdownOpenChange(open)}>
                            <DropdownMenuTrigger asChild>
                                <span>
                                    <HorizontalEllipsis className="size-[18px]" />
                                </span>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="right" align="start" alignOffset={6} sideOffset={12} className="rounded-lg">
                            <DropdownMenuItem role="button" className="!p-0">
                                    <button type="button" onClick={() => setActiveTaskEdit(listId, taskId, false)} className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-blue-400">
                                        <Pencil className="size-3.5" />
                                        Edit Task
                                    </button>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem role="button" className="!p-0">
                                    <button type="button" onClick={() => deleteTask(listId, taskId)} className="w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-red-400">
                                        <TrashCan className="size-4" />
                                        Delete Task
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TooltipTrigger>

                <TooltipContent aria-disabled={isTaskActionsOpen}>
                    Task actions
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TaskActions;