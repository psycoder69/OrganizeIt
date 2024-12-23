import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";
import { useState } from "react";

export const AddNewBoardButton = () => {
    const { addBoard } = useTaskBoardStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");

    const handleAddNewBoardButtonClick = () => {
        if (newBoardTitle.trim().length === 0) return;

        addBoard(newBoardTitle);
        setIsDialogOpen(false);
    };

    // Clear the input when the dialog closes
    const handleDialogClose = (isOpen: boolean) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            setNewBoardTitle(""); // Clear the input when the dialog is closed
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <Button variant="secondary" onClick={() => setIsDialogOpen(true)} className="h-10 text-[15px] bg-slate-200 hover:bg-slate-300 mx-2 mt-8">
                    <Plus className="!size-[18px]" />
                    Add new Board
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Add New Board
                    </DialogTitle>
                    <DialogDescription>
                        Enter the New Board Title here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="board-title" className="text-right">
                            Board Title
                        </Label>
                        <Input
                            id="board-title"
                            className="col-span-3 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500 shadow-sm transition-all duration-300 ease-in-out"
                            value={newBoardTitle}
                            onChange={(event) => setNewBoardTitle(event.target.value)}
                            placeholder="Task Management Board"
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAddNewBoardButtonClick}>
                        Add new Board
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
