import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd, SquareTerminal } from "lucide-react";
import { NavUser } from "./NavUser";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";

const data = {
    user: {
        name: "Anshu Kumar Singh",
        email: "anshu.singh.dev.official@gmail.com",
        avatar: "/chillguy.jpeg",
    },
    teams: [
        {
            name: "LogIQids",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "ZuAI",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "VR AR MR",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Boards",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
