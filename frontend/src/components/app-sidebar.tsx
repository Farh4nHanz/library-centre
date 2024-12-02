import { useCallback, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

/** @hooks */
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

/** @redux */
import { logoutUser } from "@/redux/thunks/auth-thunk";

/** @components */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomDialog as Dialog } from "@/components/custom-dialog";
import { Loader } from "@/components/loader";

/** @icons */
import {
  Home,
  BookOpen,
  ChevronsUpDown,
  CircleUserRound,
  LogOut,
} from "lucide-react";

const Header = () => {
  return (
    <SidebarHeader>
      <div className="h-8 flex justify-between group-data-[collapsible=icon]:justify-center items-center">
        <h2 className="text-lg font-bold group-data-[collapsible=icon]:hidden">
          Library Centre
        </h2>
        <NavLink to="/" className="bg-white shadow-md rounded-sm p-1">
          <BookOpen size={20} />
        </NavLink>
      </div>
    </SidebarHeader>
  );
};

const Content = () => {
  const { pathname } = useLocation();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Feature</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/")}>
                <NavLink to="/">
                  <Home />
                  Home
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);

  const logout = useCallback(async () => {
    const res = await dispatch(logoutUser()).unwrap();
    if (logoutUser.fulfilled.match(res)) {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-between items-center cursor-pointer gap-3">
                <Avatar className="rounded-md size-8">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <CircleUserRound />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm">Username</span>
                  <small>user@gmail.com</small>
                </div>
                <ChevronsUpDown className="ml-auto size-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Logout will remove all your data from this device. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>
            {status === "loading" ? (
              <Loader variant="1" color="white" />
            ) : (
              "Logout"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </Dialog>
    </SidebarFooter>
  );
};

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
};
