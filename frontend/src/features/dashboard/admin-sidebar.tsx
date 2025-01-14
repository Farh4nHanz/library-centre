import { useCallback, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

/** @context */
import { useAuth } from "@/context/user-context";
import { usePath } from "@/context/path-context";

/** @hooks */
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

/** @redux */
import { logoutUser } from "@/redux/thunks/auth-thunk";

/** @constants */
import { adminSidebarMenu } from "@/constants";

/** @components */
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
} from "@/components/ui/alert/alert-dialog";
import { CustomAlertDialog as LogoutAlertDialog } from "@/components/ui/alert/custom-alert-dialog";
import { Loader } from "@/components/ui/loader";

/** @icons */
import {
  BookOpen,
  ChevronsUpDown,
  CircleUserRound,
  LogOut,
} from "lucide-react";

export const AdminSidebar = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);

  const { path } = usePath();
  const navigate = useNavigate();

  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  const logout = useCallback(async () => {
    const res = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(res)) {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <AppSidebar collapsible="icon">
      {/* sidebar header */}
      <AppSidebar.Header>
        <div className="h-8 flex justify-between px-2 group-data-[collapsible=icon]:justify-center items-center">
          <h2 className="text-xl font-bold group-data-[collapsible=icon]:hidden">
            Library Centre
          </h2>
          <Link to={"/dashboard"} className="bg-white shadow-md rounded-sm p-1">
            <BookOpen size={20} />
          </Link>
        </div>
      </AppSidebar.Header>

      {/* sidebar content */}
      <AppSidebar.Content>
        {adminSidebarMenu?.map((adminSidebarMenu) => (
          <SidebarGroup key={adminSidebarMenu.group}>
            <SidebarGroupLabel>{adminSidebarMenu.group}</SidebarGroupLabel>
            {adminSidebarMenu.menus.map((menu) => (
              <SidebarGroupContent key={menu.name}>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={path === menu.link}>
                      <NavLink to={menu.link}>
                        <menu.icon />
                        {menu.name}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            ))}
          </SidebarGroup>
        ))}
      </AppSidebar.Content>

      {/* sidebar footer */}
      <AppSidebar.Footer>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-between items-center cursor-pointer gap-3">
                  <div className="relative">
                    <Avatar className="rounded-md size-8">
                      <AvatarImage src={user?.photoURL as string} />
                      <AvatarFallback>
                        <CircleUserRound />
                      </AvatarFallback>
                    </Avatar>

                    <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
                      <span className="sr-only">Online</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                    <span className="text-sm">{user?.username}</span>
                    <small>{user?.email}</small>
                  </div>
                  <ChevronsUpDown className="ml-auto size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LogoutAlertDialog
              open={isLogoutDialogOpen}
              onOpenChange={setIsLogoutDialogOpen}
            >
              <LogoutAlertDialog.Header
                title="Are you sure you want to logout?"
                description="Logout will remove all your data from this device. Are you sure?"
              />
              <LogoutAlertDialog.Footer>
                <AlertDialogCancel disabled={status === "loading"}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <Loader size="sm" color="white" />
                  ) : (
                    "Logout"
                  )}
                </AlertDialogAction>
              </LogoutAlertDialog.Footer>
            </LogoutAlertDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </AppSidebar.Footer>
    </AppSidebar>
  );
};
