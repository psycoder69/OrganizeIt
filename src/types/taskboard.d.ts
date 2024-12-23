import { ListType } from "./list";

export interface TaskBoardType {
    id: string;
    title: string;
    lists: ListType[];
    createdAt: string;
}