"use client"

import { ChevronRight, MoreHorizontal, Pencil, Trash2, type LucideIcon } from "lucide-react"

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTaskBoardStore } from "@/store/useTaskBoardStore";
import { AddNewBoardButton } from "./AddNewBoardButton";

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
		isActive?: boolean
		items?: {
			title: string
			url: string
		}[]
	}[],
}) {
	const isMobile = useSidebar();

	const { boards, activeBoard, setActiveBoard, setActiveBoardEdit, clearBoard, deleteBoard } = useTaskBoardStore();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				Menu
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{boards.map((board) => (
										<SidebarMenuItem key={board.id}>
											<SidebarMenuButton asChild onClick={() => setActiveBoard(board)} className="line-clamp-1 cursor-pointer hover:bg-slate-100">
												<span>{board.title}</span>
											</SidebarMenuButton>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													{
														(board.id === activeBoard.id)
														&&
														<SidebarMenuAction showOnHover>
															<MoreHorizontal />
															<span className="sr-only">More</span>
														</SidebarMenuAction>
													}
												</DropdownMenuTrigger>
												<DropdownMenuContent
													className="w-48 rounded-lg"
													side={isMobile ? "bottom" : "right"}
													align={isMobile ? "end" : "start"}
												>
													<DropdownMenuItem className="!p-0">
														<button type="button" onClick={() => setActiveBoardEdit(true)} className="group w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-blue-400">
															<Pencil className="size-4 text-muted-foreground group-hover:text-white" />
															<span>Edit Title</span>
														</button>
													</DropdownMenuItem>
													<DropdownMenuItem className="!p-0">
														<button type="button" onClick={() => clearBoard()} className="group w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-red-400">
															<Trash2 className="size-4 text-muted-foreground group-hover:text-white" />
															<span>Clear Board</span>
														</button>
													</DropdownMenuItem>

													{
														(boards.length > 1)
														&&
														<>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="!p-0">
																<button type="button" onClick={() => deleteBoard()} className="group w-full flex items-center justify-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:text-white hover:font-semibold hover:bg-red-400">
																	<Trash2 className="size-4 text-muted-foreground group-hover:text-white" />
																	<span>Delete Board</span>
																</button>
															</DropdownMenuItem>
														</>
													}
												</DropdownMenuContent>
											</DropdownMenu>
										</SidebarMenuItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>

			<AddNewBoardButton />
		</SidebarGroup>
	)
}
