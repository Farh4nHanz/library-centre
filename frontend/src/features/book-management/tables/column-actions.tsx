import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

/** @schema */
import { bookSchema } from "@/schema/book-schema";

/** @types */
import { type Book } from "@/types";
import { type BookPayload } from "@/types/api-type";
import { type BookSchema } from "@/types/schema-type";

/** @hooks */
import { useDeleteBookById, useUpdateBookById } from "@/hooks/use-book";
import { useToast } from "@/hooks/use-toast";

/** @constants */
import { BOOK_QUERY_KEY } from "@/constants/dashboard";

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
import { CustomDialog as UpdateBookDialog } from "@/components/ui/custom-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { CustomAlertDialog as DeleteBookAlertDialog } from "@/components/ui/alert/custom-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert/alert-dialog";
import { Loader } from "@/components/ui/loader";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";

/** @icons */
import { MoreHorizontal } from "lucide-react";

type BookDialogState = {
  isDetailBookDialogOpen: boolean;
  isUpdateBookDialogOpen: boolean;
  isDeleteBookDialogOpen: boolean;
};

export const ColumnActions = ({ book }: { book: Book }) => {
  const [dialogState, setDialogState] = useState<BookDialogState>({
    isDetailBookDialogOpen: false,
    isUpdateBookDialogOpen: false,
    isDeleteBookDialogOpen: false,
  });

  const handleDialogStateChange = useCallback(
    (state: keyof typeof dialogState, value: boolean) => {
      setDialogState((d) => ({ ...d, [state]: value }));
    },
    []
  );

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });
  const { control, handleSubmit, reset } = form;

  const handleUpdateBookDialogClose = useCallback(() => {
    handleDialogStateChange("isUpdateBookDialogOpen", false);
    reset();
  }, [handleDialogStateChange, reset]);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  // update book mutation
  const { mutate: updateBookMutate, isPending: isUpdateBookPending } =
    useUpdateBookById();
  const updateBookById = handleSubmit((values) => {
    updateBookMutate(
      { bookId: book.id, bookData: values as BookPayload },
      {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });

          queryClient.invalidateQueries({
            queryKey: [BOOK_QUERY_KEY[1], book.id],
          });

          handleDialogStateChange("isUpdateBookDialogOpen", false);
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

          handleDialogStateChange("isUpdateBookDialogOpen", false);
        },
      }
    );
  });

  // delete book mutation
  const { mutate: deleteBookMutate, isPending: isDeleteBookPending } =
    useDeleteBookById();
  const deleteBookById = useCallback(
    (bookId: string) => {
      deleteBookMutate(bookId, {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });

          queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY[0]] });
          handleDialogStateChange("isDeleteBookDialogOpen", false);
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

          handleDialogStateChange("isDeleteBookDialogOpen", false);
        },
      });
    },
    [deleteBookMutate, toast, queryClient, handleDialogStateChange]
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
          <DropdownMenuItem
            onClick={() =>
              handleDialogStateChange("isUpdateBookDialogOpen", true)
            }
          >
            Edit book
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handleDialogStateChange("isDeleteBookDialogOpen", true)
            }
          >
            Delete book
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* update book dialog */}
      <UpdateBookDialog
        open={dialogState.isUpdateBookDialogOpen}
        onOpenChange={handleUpdateBookDialogClose}
        className="max-w-md"
      >
        <UpdateBookDialog.Header title="Edit book" />

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={updateBookById}
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormInput
                name="title"
                control={control}
                defaultValue={book.title}
              />
              <FormInput
                name="author"
                control={control}
                defaultValue={book.author}
              />
            </div>
            <FormInput
              name="description"
              control={control}
              component="textarea"
              defaultValue={book.description}
            />
            <FormInput
              name="genre"
              control={control}
              defaultValue={book.genre}
            />
            <FormInput
              name="cover"
              control={control}
              type="file"
              description="Only .jpg, .jpeg, or .png extensions are allowed. Max file size: 2MB."
              accept="image/*"
            />
            <FormInput
              name="isbn"
              control={control}
              type="number"
              min={0}
              description="*Optional"
              defaultValue={book.isbn}
            />
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormInput
                name="pages"
                control={control}
                type="number"
                min={0}
                defaultValue={book.pages}
              />
              <FormInput
                name="totalCopies"
                control={control}
                type="number"
                min={0}
                defaultValue={book.totalCopies}
              />
            </div>
            <div className="grid grid-cols-[60fr_40fr] gap-4">
              <FormInput
                name="publisher"
                control={control}
                defaultValue={book.publisher}
              />
              <FormInput
                name="publicationDate"
                control={control}
                type="date"
                defaultValue={book.publicationDate}
              />
            </div>

            <UpdateBookDialog.Footer>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleUpdateBookDialogClose}
                  disabled={isUpdateBookPending}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isUpdateBookPending}>
                {isUpdateBookPending ? (
                  <Loader size="sm" color="white" />
                ) : (
                  "Save"
                )}
              </Button>
            </UpdateBookDialog.Footer>
          </form>
        </Form>
      </UpdateBookDialog>

      {/* delete book dialog */}
      <DeleteBookAlertDialog
        open={dialogState.isDeleteBookDialogOpen}
        onOpenChange={(open) =>
          handleDialogStateChange("isDeleteBookDialogOpen", open)
        }
      >
        <DeleteBookAlertDialog.Header
          title="Delete this book?"
          description="This will permanently delete the book and all its associated data."
        />
        <DeleteBookAlertDialog.Footer>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteBookById(book.id);
            }}
            disabled={isDeleteBookPending}
          >
            {isDeleteBookPending ? (
              <Loader size="sm" color="white" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </DeleteBookAlertDialog.Footer>
      </DeleteBookAlertDialog>
    </>
  );
};
