import { ListType } from "@/types/list";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ListActions from "./ListActions";
import Task from "../Task/Task";
import { Plus } from "../Icons";
import AutoResizeInput from "../ui/AutoResizeInput";
import { useState } from "react";
import { Button } from "../ui/button";
import NewTaskTemplate from "../Task/NewTaskTemplate";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const List = ({ listIndex, list }: { listIndex: number, list: ListType }) => {
    const { activeTaskEdit, setActiveTaskEdit, activeListEdit, setActiveListEdit, updateListTitle } = useTaskBoardStore();

    const [updatedListTitle, setUpdatedListTitle] = useState(list.title);

    const handleUpdateListClick = () => {
        if (updatedListTitle.trim().length === 0) {
            return;
        }

        updateListTitle(list.id, updatedListTitle);
        setActiveListEdit(null, null);
    };

    const handleCancelListEdit = () => {
        setUpdatedListTitle(list.title);
        setActiveListEdit(null, null);
    };

    return (
        <Draggable draggableId={`list-${list.id}`} key={`list-${list.id}`} index={listIndex}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className={`w-72 shrink-0 flex flex-col gap-2 py-2 rounded-lg shadow-md bg-gray-100`}
                >
                    <div className="flex items-center justify-between gap-2 rounded-lg mx-4">
                        {
                            (activeListEdit.listId === list.id)
                                ?
                                <div className="flex flex-col gap-2">
                                    <AutoResizeInput
                                        inputName="list-title"
                                        inputValue={updatedListTitle}
                                        setInputValue={setUpdatedListTitle}
                                        placeholder="Add List Title"
                                        className="text-base"
                                        autofocus={true}
                                        maxInputHeight={88}
                                    />

                                    <div className="w-full flex items-center justify-start gap-2 mt-1">
                                        <Button
                                            variant="default"
                                            onClick={handleUpdateListClick}
                                            className="text-white text-sm border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-500 hover:border-blue-500 !px-4"
                                        >
                                            Update
                                        </Button>

                                        <Button
                                            variant="default"
                                            onClick={handleCancelListEdit}  // Cancel edit
                                            className="text-red-400 text-sm border border-red-400 rounded-lg bg-white hover:bg-red-500 hover:text-white hover:border-red-500 !px-4"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                                :
                                <h2 className="line-clamp-1 grow text-lg font-semibold">{list.title}</h2>
                        }

                        <ListActions listId={list.id} />
                    </div>

                    {/* Render tasks within each list */}

                    <Droppable droppableId={`tasks-${list.id}`} type="task" direction="vertical" isDropDisabled={false} isCombineEnabled={true} ignoreContainerClipping={true}>
                        {(provided) => (
                            <ul
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-2 bg-gray-100 p-2 rounded-md"
                            >
                                {list.tasks.map((task, taskIndex) => (
                                    <Task key={task.id} listId={list.id} taskIndex={taskIndex} task={task} />
                                ))}

                                {
                                    (activeTaskEdit.listId === list.id && activeTaskEdit.isNew)
                                    &&
                                    <NewTaskTemplate listId={list.id} />
                                }

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>

                    <Button type="button" onClick={() => setActiveTaskEdit(list.id, null, true)} className="h-9 flex items-center justify-start gap-2 text-[15px] text-[#44546f] font-medium text-left rounded-lg px-4 py-2 mx-2 bg-white hover:bg-white">
                        <Plus strokeWidth={2} className="!size-4" />
                        Add new task
                    </Button>
                </li>
            )}
        </Draggable>
    );
};

export default List;