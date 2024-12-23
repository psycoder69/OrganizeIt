import { useState } from "react";
import { Button } from "../ui/button";
import AutoResizeInput from "../ui/AutoResizeInput";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";

const NewTaskTemplate = ({ listId }: { listId: string }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const { addTaskToList, setActiveTaskEdit } = useTaskBoardStore();

    const handleAddTaskButtonClick = () => {
        if (!listId || (newTaskTitle.trim().length === 0 && newTaskDescription.trim().length === 0)) return;

        addTaskToList(listId, newTaskTitle, newTaskDescription);
        setActiveTaskEdit(null, null, null);
    };

    return (
        <div className="flex flex-col justify-center gap-2 flex-1 rounded-lg shadow bg-white pl-4 pr-2 py-2 cursor-pointer">
            <AutoResizeInput
                inputName="task-title"
                inputValue={newTaskTitle}
                setInputValue={setNewTaskTitle}
                placeholder="Add task title"
                className="text-sm"
                autofocus={true}
                maxInputHeight={116}
            />
            <AutoResizeInput
                inputName="task-description"
                inputValue={newTaskDescription}
                setInputValue={setNewTaskDescription}
                placeholder="Add task description"
                className="text-sm"
                maxInputHeight={216}
            />

            <div className="w-full flex items-center justify-start gap-2 mt-1">
                <Button
                    variant="default"
                    onClick={handleAddTaskButtonClick}
                    className="text-white text-sm border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-500 hover:border-blue-500 !px-4"
                >
                    Add
                </Button>

                <Button
                    variant="default"
                    onClick={() => setActiveTaskEdit(null, null, null)}
                    className="text-red-400 text-sm border border-red-400 rounded-lg bg-white hover:bg-red-500 hover:text-white hover:border-red-500 !px-4"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default NewTaskTemplate;