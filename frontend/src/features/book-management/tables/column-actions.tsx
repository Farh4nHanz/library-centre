import { useCallback, useState } from "react";

/** @types */
import { type Book } from "@/types";

/** @hooks */
import { useDeleteBookById } from "@/hooks/use-book";
import { useToast } from "@/hooks/use-toast";

/** @components */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CustomAlertDialog as DeleteBookAlertDialog } from "@/components/ui/alert/custom-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert/alert-dialog";
import { Loader } from "@/components/ui/loader";

/** @icons */
import { MoreHorizontal } from "lucide-react";
import { AxiosError } from "axios";

export const ColumnActions = ({ book }: { book: Book }) => {
  const [isDeleteBookDialogOpen, setIsDeleteBookDialogOpen] =
    useState<boolean>(false);

  const { toast } = useToast();

  // delete book mutation
  const { mutate: deleteBookMutate, isPending } = useDeleteBookById();
  const deleteBookById = useCallback(
    (bookId: string) => {
      deleteBookMutate(bookId, {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: data.message,
          });
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response) {
            toast({
              title: "Error",
              description: err.response.data.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          }
        },
      });
    },
    [deleteBookMutate, toast]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(book.id)}
          >
            Copy book ID
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>View book details</DropdownMenuItem>
          <DropdownMenuItem>Edit book</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteBookDialogOpen(true)}>
            Delete book
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBookAlertDialog
        open={isDeleteBookDialogOpen}
        onOpenChange={setIsDeleteBookDialogOpen}
      >
        <DeleteBookAlertDialog.Footer>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteBookById(book.id)}>
            {isPending ? <Loader variant="1" color="white" /> : "Delete"}
          </AlertDialogAction>
        </DeleteBookAlertDialog.Footer>
      </DeleteBookAlertDialog>
    </>
  );
};
