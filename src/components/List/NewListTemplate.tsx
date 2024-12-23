import { useTaskBoardStore } from "@/store/useTaskBoardStore";
import { Plus } from "../Icons";

import AutoResizeInput from "../ui/AutoResizeInput";
import { Button } from "../ui/button";
import { useState } from "react";

const NewListTemplate = () => {
    const [newListTitle, setNewListTitle] = useState<string>("");

    const { setActiveListEdit } = useTaskBoardStore();

    const { activeBoard, addListToBoard } = useTaskBoardStore();

    const handleAddListButtonClick = () => {
        if (!activeBoard || newListTitle.trim().length === 0) return;

        addListToBoard(newListTitle);
        setActiveListEdit(null, null);
    };

    return (
        <li
            className={`w-72 shrink-0 flex flex-col gap-2 py-2 rounded-lg shadow-md bg-gray-100`}
        >
            <div className="flex flex-col items-center justify-between gap-2 rounded-lg mx-4">
                <AutoResizeInput
                    inputName="list-title"
                    inputValue={newListTitle}
                    setInputValue={setNewListTitle}
                    placeholder="Add List Title"
                    className="text-base"
                    autofocus={true}
                    maxInputHeight={88}
                />

                <div className="w-full flex items-center justify-start gap-2 mt-1">
                    <Button
                        variant="default"
                        onClick={handleAddListButtonClick}
                        className="text-white text-sm border border-blue-400 rounded-lg bg-blue-400 hover:bg-blue-500 hover:border-blue-500 !px-4"
                    >
                        Add
                    </Button>

                    <Button
                        variant="default"
                        onClick={() => setActiveListEdit(null, null)}
                        className="text-red-400 text-sm border border-red-400 rounded-lg bg-white hover:bg-red-500 hover:text-white hover:border-red-500 !px-4"
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            <button type="button" disabled className="flex items-center justify-start gap-2 text-[15px] text-[#44546f] font-medium text-left rounded-lg px-4 py-1.5 mx-2 bg-white cursor-not-allowed">
                <Plus strokeWidth={2} className="size-[18px]" />
                Add new task
            </button>
        </li>
    );
};

export default NewListTemplate;