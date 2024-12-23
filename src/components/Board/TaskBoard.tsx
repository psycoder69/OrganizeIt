"use client";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import List from "../List/List";
import NewListTemplate from "../List/NewListTemplate";
import { Button } from "../ui/button";
import { Plus } from "../Icons";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const TaskBoard = () => {
    const { boards, setBoards, activeBoard, setActiveBoard, activeListEdit, setActiveListEdit } = useTaskBoardStore.getState();

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination, type } = result;

        // Exit if there's no valid destination or no active board
        if (!destination || !activeBoard) return;

        const boardIndex = boards.findIndex((board) => board.id === activeBoard.id);

        if (boardIndex === -1) return; // Ensure the active board exists in the list

        const updatedBoard = { ...activeBoard }; // Create a shallow copy of the active board

        if (type === "task") {
            const sourceListIndex = updatedBoard.lists.findIndex(
                (list) => `tasks-${list.id}` === source.droppableId
            );
            const destListIndex = updatedBoard.lists.findIndex(
                (list) => `tasks-${list.id}` === destination.droppableId
            );

            if (sourceListIndex === -1 || destListIndex === -1) return; // Ensure valid source and destination lists

            if (sourceListIndex === destListIndex) {
                // Reorder tasks within the same list
                const updatedTasks = [...updatedBoard.lists[sourceListIndex].tasks];
                const [movedTask] = updatedTasks.splice(source.index, 1);
                updatedTasks.splice(destination.index, 0, movedTask);

                updatedBoard.lists[sourceListIndex].tasks = updatedTasks;
            } else {
                // Move tasks between different lists
                const sourceTasks = [...updatedBoard.lists[sourceListIndex].tasks];
                const [movedTask] = sourceTasks.splice(source.index, 1);
                const destTasks = [...updatedBoard.lists[destListIndex].tasks];
                destTasks.splice(destination.index, 0, movedTask);

                updatedBoard.lists[sourceListIndex].tasks = sourceTasks;
                updatedBoard.lists[destListIndex].tasks = destTasks;
            }
        } else if (type === "list") {
            // Reorder lists
            const updatedLists = [...updatedBoard.lists];
            const [movedList] = updatedLists.splice(source.index, 1);
            updatedLists.splice(destination.index, 0, movedList);

            updatedBoard.lists = updatedLists;
        }

        // Update boards in the Zustand store
        const updatedBoards = boards.map((board, index) =>
            index === boardIndex ? updatedBoard : board
        );

        // Update the Zustand store with the new boards state
        setBoards(updatedBoards);

        // Update activeBoard with the new order of lists if it's been changed
        if (updatedBoard.id === activeBoard.id) {
            setActiveBoard(updatedBoard); // Ensure activeBoard is updated
        }
    };

    if (!activeBoard) return null;

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
                droppableId="lists"
                direction="horizontal"
                type="list"
                isDropDisabled={false}
                isCombineEnabled={true}
                ignoreContainerClipping={true}
            >
                {(provided) => (
                    <div className="h-full flex gap-8 items-start justify-start bg-slate-200 p-4 overflow-x-auto scrollbar-hidden">
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-8 items-start"
                        >
                            {activeBoard.lists.map((list, listIndex) => (
                                <List listIndex={listIndex} list={list} key={`list-${list.id}`} />
                            ))}

                            {provided.placeholder}
                        </ul>

                        {activeListEdit.isNew === true ? (
                            <NewListTemplate />
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setActiveListEdit(null, true)}
                                className="w-72 h-11 flex items-center justify-start gap-2 text-base text-[#44546f] font-medium text-left rounded-lg px-4 py-1.5 bg-slate-50 hover:bg-slate-50 shrink-0"
                            >
                                <Plus strokeWidth={2} className="!size-[18px]" />
                                Add new list
                            </Button>
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TaskBoard;
