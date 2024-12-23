"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { useState } from "react";
import TaskBoard from "@/components/Board/TaskBoard";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";
import { BoardTitle } from "@/components/Board/BoardTitle";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const { activeBoard } = useTaskBoardStore();

  if (!activeBoard) return null;

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      style={{
        "--sidebar-width": "16rem"
      } as React.CSSProperties}
    >
      <AppSidebar />

      <main className={`${sidebarOpen ? "w-[calc(100dvw-16rem)]" : "w-screen"} flex flex-col flex-1`}>
        <SidebarTrigger sidebarOpen={sidebarOpen} className="w-fit px-2 mt-2 ml-1 fixed" />

        <BoardTitle boardTitle={activeBoard.title} />

        <TaskBoard />
      </main>
    </SidebarProvider>
  );
};

export default App;