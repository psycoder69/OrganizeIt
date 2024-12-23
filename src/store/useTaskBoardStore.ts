import { create } from "zustand";
import { TaskBoardType } from "@/types/taskboard"; // TaskBoardType interface
import { ListType } from "@/types/list"; // ListType interface
import { TaskType } from "@/types/task"; // TaskType interface
import { generateUniqueId } from "@/helper/generateUniqueId"; // Utility to generate unique IDs

// Key definitions for localStorage
const TASK_BOARDS_KEY = "task-boards";
const ACTIVE_BOARD_ID = "active-board-id";

// Helper functions

// Define the default board structure
const createDefaultBoard = (): TaskBoardType[] => {
    // Define the default lists and tasks
    const defaultLists: ListType[] = [
        {
            id: generateUniqueId(),
            title: "To Do",
            tasks: [
                {
                    id: generateUniqueId(),
                    title: "Brainstorm New Product Features",
                    description: "Research and list innovative features for the next version, focusing on customer needs.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Develop Marketing Strategy",
                    description: "Create a plan for social media campaigns, influencer partnerships, and content.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Conduct User Interviews",
                    description: "Reach out to users for feedback to enhance the product’s user experience.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Audit Website SEO",
                    description: "Check and improve website SEO for better search engine rankings.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
            ],
            createdAt: new Date().toISOString(),
        },
        {
            id: generateUniqueId(),
            title: "In Progress",
            tasks: [
                {
                    id: generateUniqueId(),
                    title: "Prototype New UI Design",
                    description: "Build a high-fidelity UI prototype, focusing on user-friendly elements.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Implement Dark Mode",
                    description: "Develop dark mode, ensuring accessibility and consistency.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Prepare Demo for Investors",
                    description: "Finalize a pitch demo to highlight key metrics for the investor meeting.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Refactor Backend Codebase",
                    description: "Optimize the backend for better scalability and performance.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
            ],
            createdAt: new Date().toISOString(),
        },
        {
            id: generateUniqueId(),
            title: "Under Review",
            tasks: [
                {
                    id: generateUniqueId(),
                    title: "Evaluate New Tech Stack",
                    description: "Research new technologies for better app performance.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "User Experience Testing",
                    description: "Conduct UX tests to refine navigation and design.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Compliance Review",
                    description: "Ensure product compliance with industry regulations.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "App Performance Benchmarking",
                    description: "Test app performance under high load and optimize.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
            ],
            createdAt: new Date().toISOString(),
        },
        {
            id: generateUniqueId(),
            title: "Done",
            tasks: [
                {
                    id: generateUniqueId(),
                    title: "Launch Marketing Campaign",
                    description: "Launched the campaign and analyzed engagement metrics.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Update Product Roadmap",
                    description: "Updated the roadmap based on stakeholder feedback.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Complete Performance Optimization",
                    description: "Improved app performance, reducing load time by 30%.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
                {
                    id: generateUniqueId(),
                    title: "Finalize User Onboarding Process",
                    description: "Simplified onboarding to improve user retention.",
                    createdAt: new Date().toISOString(),
                    editedAt: new Date().toISOString(),
                },
            ],
            createdAt: new Date().toISOString(),
        },
    ];

    const defaultBoards = [
        {
            id: generateUniqueId(),
            title: "Task Management Board",
            lists: defaultLists,
            createdAt: new Date().toISOString(),
        },
        {
            id: generateUniqueId(),
            title: "Personal Board",
            lists: [],
            createdAt: new Date().toISOString(),
        },
    ];

    return defaultBoards;
};

// Helper function to retrieve stored boards
const getStoredBoards = (): TaskBoardType[] => {
    const storedBoards = localStorage.getItem(TASK_BOARDS_KEY);
    const activeBoardId = localStorage.getItem(ACTIVE_BOARD_ID);

    if (storedBoards) {
        return JSON.parse(storedBoards);
    }

    // If no stored boards, create a default board
    const defaultBoards = createDefaultBoard();

    // Save default board to localStorage
    localStorage.setItem(TASK_BOARDS_KEY, JSON.stringify(defaultBoards));

    if (!activeBoardId) {
        localStorage.setItem("active-board-id", defaultBoards[0].id);
    }

    return defaultBoards;
};

const getActiveBoardId = (): string | null => localStorage.getItem(ACTIVE_BOARD_ID);

export const saveBoardsToLocalStorage = (boards: TaskBoardType[]) => {
    localStorage.setItem(TASK_BOARDS_KEY, JSON.stringify(boards));
};

const saveActiveBoardIdToLocalStorage = (boardId: string) => {
    localStorage.setItem(ACTIVE_BOARD_ID, boardId);
};

// Zustand store type definition
type TaskBoardStore = {
    boards: TaskBoardType[];
    activeBoard: TaskBoardType;
    activeBoardEdit: boolean;
    activeListEdit: { listId: string | null; isNew: boolean | null };
    activeTaskEdit: { listId: string | null; taskId: string | null; isNew: boolean | null };
    setBoards: (boards: TaskBoardType[]) => void;
    setActiveBoard: (board: TaskBoardType) => void;
    addBoard: (title: string) => void;
    updateBoardTitle: (newTitle: string) => void;
    clearBoard: () => void;
    deleteBoard: () => void;
    addListToBoard: (listTitle: string) => void;
    updateListTitle: (listId: string, newTitle: string) => void;
    deleteList: (listId: string) => void;
    addTaskToList: (listId: string, taskTitle: string, taskDescription: string) => void;
    updateTask: (listId: string, taskId: string, updatedTask: Partial<TaskType>) => void;
    deleteTask: (listId: string, taskId: string) => void;
    clearList: (listId: string) => void;
    setActiveBoardEdit: (isEditing: boolean) => void;
    setActiveListEdit: (listId: string | null, isNew: boolean | null) => void;
    setActiveTaskEdit: (listId: string | null, taskId: string | null, isNew: boolean | null) => void;
};

export const useTaskBoardStore = create<TaskBoardStore>((set) => ({
    boards: getStoredBoards(),

    activeBoard: (() => {
        const boards = getStoredBoards();
        const activeBoardId = getActiveBoardId();
        return boards.find((board) => board.id === activeBoardId) || boards[0];
    })(),

    activeBoardEdit: false,
    activeListEdit: { listId: null, isNew: null },
    activeTaskEdit: { listId: null, taskId: null, isNew: null },

    setBoards: (boards) => {
        saveBoardsToLocalStorage(boards);
        set({ boards });
    },

    setActiveBoard: (updatedBoard) =>
        set((state) => {
            // Find the board with the same ID as the updatedBoard
            const activeBoard = state.boards.find((board) => board.id === updatedBoard.id) || state.boards[0];

            // If activeBoard exists, save the updated board's ID to local storage
            if (activeBoard) {
                saveActiveBoardIdToLocalStorage(updatedBoard.id);
            }

            // Return the updated state with the new activeBoard
            return { activeBoard: activeBoard }; // Ensure it's either TaskBoardType or null
        }),

    addBoard: (title) =>
        set((state) => {
            const newBoard: TaskBoardType = {
                id: generateUniqueId(),
                title,
                lists: [],
                createdAt: new Date().toISOString(),
            };

            const updatedBoards = [...state.boards, newBoard];
            saveBoardsToLocalStorage(updatedBoards);
            saveActiveBoardIdToLocalStorage(newBoard.id);

            return { boards: updatedBoards, activeBoard: newBoard };
        }),

    updateBoardTitle: (newTitle) =>
        set((state) => {
            if (!state.activeBoard) return state;
            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id ? { ...board, title: newTitle } : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    clearBoard: () => {
        set((state) => {
            // Make sure there's an active board
            if (!state.activeBoard) return state;

            // Create a copy of the activeBoard and clear the lists
            const updatedBoard = { ...state.activeBoard, lists: [] };

            // Update the activeBoard with the cleared lists
            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id ? updatedBoard : board
            );

            // Update boards in the store
            saveBoardsToLocalStorage(updatedBoards); // Persist the boards to localStorage if needed

            return { boards: updatedBoards, activeBoard: updatedBoard }; // Update store state
        });
    },

    deleteBoard: () =>
        set((state) => {
            if (!state.activeBoard) return state;

            // Find the index of the board to delete
            const boardIndex = state.boards.findIndex((board) => board.id === state.activeBoard.id);

            // If board not found, return the current state
            if (boardIndex === -1) return state;

            // Remove the board from the boards array
            const updatedBoards = state.boards.filter((board) => board.id !== state.activeBoard.id);

            saveBoardsToLocalStorage(updatedBoards);

            // Set active board to the previous one, or the new first one if the deleted one was first
            const updatedActiveBoard = updatedBoards[boardIndex - 1] || updatedBoards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard || getStoredBoards()[0] };
        }),

    addListToBoard: (listTitle) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const newList: ListType = {
                id: generateUniqueId(),
                title: listTitle,
                tasks: [],
                createdAt: new Date().toISOString(),
            };

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? { ...board, lists: [...board.lists, newList] }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    updateListTitle: (listId, newTitle) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.id === listId ? { ...list, title: newTitle } : list
                        ),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    deleteList: (listId) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.filter((list) => list.id !== listId),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    addTaskToList: (listId, taskTitle, taskDescription) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const newTask: TaskType = {
                id: generateUniqueId(),
                title: taskTitle,
                description: taskDescription,
                createdAt: new Date().toISOString(),
                editedAt: new Date().toISOString(),
            };

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.id === listId
                                ? { ...list, tasks: [...list.tasks, newTask] }
                                : list
                        ),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    updateTask: (listId, taskId, updatedTask) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.id === listId
                                ? {
                                    ...list,
                                    tasks: list.tasks.map((task) =>
                                        task.id === taskId ? { ...task, ...updatedTask } : task
                                    ),
                                }
                                : list
                        ),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    deleteTask: (listId, taskId) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.id === listId
                                ? {
                                    ...list,
                                    tasks: list.tasks.filter((task) => task.id !== taskId),
                                }
                                : list
                        ),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    clearList: (listId) =>
        set((state) => {
            if (!state.activeBoard) return state;

            const updatedBoards = state.boards.map((board) =>
                board.id === state.activeBoard.id
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.id === listId ? { ...list, tasks: [] } : list
                        ),
                    }
                    : board
            );

            saveBoardsToLocalStorage(updatedBoards);

            // Directly return the updated activeBoard
            const updatedActiveBoard = updatedBoards.find((board) => board.id === state.activeBoard.id) || state.boards[0];

            return { boards: updatedBoards, activeBoard: updatedActiveBoard };
        }),

    setActiveBoardEdit: (isEditing) => {
        set({ activeBoardEdit: isEditing });
    },

    setActiveListEdit: (listId, isNew) => {
        set({ activeListEdit: { listId, isNew } });
    },

    setActiveTaskEdit: (listId, taskId, isNew) => {
        set({ activeTaskEdit: { listId, taskId, isNew } });
    },
}));

