import { useTaskBoardStore } from "@/store/useTaskBoardStore";
import { Input } from "@/components/ui/input";

export const BoardTitle = ({ boardTitle }: { boardTitle: string }) => {
    const { activeBoardEdit } = useTaskBoardStore();

    return (
        activeBoardEdit === true ? (
            <Input
                value={boardTitle}
                className="w-80 text-3xl font-semibold mx-auto my-6"
            />
        ) : (
            <h1 className="text-center text-3xl font-semibold my-6">
                {boardTitle}
            </h1>
        )
    );
};