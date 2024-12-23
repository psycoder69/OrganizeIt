import { TaskType } from "@/types/task";
import { Draggable } from "react-beautiful-dnd";
import TaskActions from "./TaskActions";
import AutoResizeInput from "../ui/AutoResizeInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const Task = ({ listId, taskIndex, task }: { listId: string, taskIndex: number, task: TaskType }) => {
    const { activeTaskEdit, setActiveTaskEdit, updateTask } = useTaskBoardStore();

    // Create state to hold updated values of title and description
    const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
    const [editedTaskDescription, setEditedTaskDescription] = useState(task.description);

    // Handle updating task on button click
    const handleUpdateTaskClick = () => {
        const updatedTask: TaskType = {
            id: task.id,
            title: editedTaskTitle,  // Use state for updated title
            description: editedTaskDescription,  // Use state for updated description
            createdAt: task.createdAt,
            editedAt: new Date().toISOString()
        };

        updateTask(listId, task.id, updatedTask);
        setActiveTaskEdit(null, null, null);
    };

    const handleCancelTaskEdit = () => {
        setEditedTaskTitle(task.title);
        setEditedTaskDescription(task.description);
        setActiveTaskEdit(null, null, null);
    };

    const isBeingEdited = (activeTaskEdit.listId === listId && activeTaskEdit.taskId === task.id);

    return (
        <Draggable
            draggableId={`task-${task.id}`}
            key={`task-${task.id}`}
            index={taskIndex}
            isDragDisabled={isBeingEdited}
        >
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className="flex gap-2 bg-white pl-4 pr-2 py-2 rounded-lg shadow cursor-pointer"
                >
                    <div className="flex flex-col justify-center gap-2 flex-1">
                        {
                            (activeTaskEdit.listId === listId && activeTaskEdit.taskId === task.id)
                                ?
                                <>
                                    {/* Controlled inputs to track changes */}
                                    <AutoResizeInput
                                        inputName="task-title"
                                        inputValue={editedTaskTitle}
                                        setInputValue={setEditedTaskTitle}
                                        placeholder="Add task title"
                                        className="text-sm"
                                        autofocus={true}
                                        maxInputHeight={116}
                                    />
                                    <AutoResizeInput
                                        inputName="task-description"
                                        inputValue={editedTaskDescription}
                                        setInputValue={setEditedTaskDescription}
                                        placeholder="Add task description"
                                        className="text-sm"
                                        maxInputHeight={216}
                                    />

                                    <div className="w-full flex items-center justify-start gap-2 mt-1">
                                        <Button
                                            variant="default"
                                            onClick={handleUpdateTaskClick}  // Call the update function
                                            className="text-white text-sm border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-500 hover:border-blue-500 !px-4"
                                        >
                                            Update
                                        </Button>

                                        <Button
                                            variant="default"
                                            onClick={handleCancelTaskEdit}  // Cancel edit
                                            className="text-red-400 text-sm border border-red-400 rounded-lg bg-white hover:bg-red-500 hover:text-white hover:border-red-500 !px-4"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                                :
                                <>
                                    {
                                        task.title.length > 0
                                        &&
                                        <h3 className="line-clamp-2 leading-normal font-medium">{task.title}</h3>
                                    }

                                    {
                                        task.description.length > 0
                                        &&
                                        <p className="line-clamp-[8] leading-normal text-sm text-gray-600">{task.description}</p>
                                    }
                                </>
                        }
                    </div>

                    {
                        (activeTaskEdit.taskId !== task.id)
                        &&
                        <div>
                            <TaskActions listId={listId} taskId={task.id} />
                        </div>
                    }
                </li>
            )}
        </Draggable>
    );
};


export default Task;