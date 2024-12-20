import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

/** @hooks */
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

/** @redux */
import { logoutUser } from "@/redux/thunks/auth-thunk";

/** @constants */
import { adminSidebarMenu } from "@/constants";

/** @components */
import { Sidebar } from "@/components/ui/sidebar";
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
} from "@/components/ui/alert/alert-dialog";
import { CustomAlertDialog as AlertDialog } from "@/components/ui/alert/custom-alert-dialog";
import { Loader } from "@/components/ui/loader";
import { Header as SidebarHeader } from "@/components/sidebar/sidebar-header";
import { Content as SidebarContent } from "@/components/sidebar/sidebar-content";
import { Footer as SidebarFooter } from "@/components/sidebar/sidebar-footer";

/** @icons */
import { ChevronsUpDown, CircleUserRound, LogOut } from "lucide-react";

export const AdminSidebar = () => {
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
    <Sidebar collapsible="icon">
      <SidebarHeader link="/dashboard" />
      <SidebarContent contents={adminSidebarMenu} />
      <SidebarFooter>
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

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
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
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
};
