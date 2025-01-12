import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

/** @schema */
import { updateBookSchema } from "@/schema/book-schema";

/** @types */
import { type Book } from "@/types";
import { type UpdateBookSchema } from "@/types/schema-type";

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
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

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

  const form = useForm<UpdateBookSchema>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      description: book.description,
      genre: Array.from(book.genre).join(", "),
      isbn: book.isbn,
      pages: String(book.pages) as unknown as number,
      totalCopies: String(book.totalCopies) as unknown as number,
      publisher: book.publisher,
      publicationDate: new Date(book.publicationDate)
        .toISOString()
        .split("T")[0] as unknown as Date,
    },
  });
  const { control, handleSubmit, reset } = form;

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(book.id);
    toast({
      description: "Copied to clipboard.",
      duration: 2500,
    });
  }, [book.id, toast]);

  const handleUpdateBookDialogClose = useCallback(() => {
    handleDialogStateChange("isUpdateBookDialogOpen", false);
    reset();
  }, [handleDialogStateChange, reset]);

  // update book mutation
  const { mutate: updateBookMutate, isPending: isUpdateBookPending } =
    useUpdateBookById();
  const updateBookById = handleSubmit((values) => {
    updateBookMutate(
      { bookId: book.id, bookData: values },
      {
        onSuccess: (data) => {
          handleDialogStateChange("isUpdateBookDialogOpen", false);
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });

          queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY[0]] });
        },
        onError: (err) => {
          handleDialogStateChange("isUpdateBookDialogOpen", false);

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
          handleDialogStateChange("isDeleteBookDialogOpen", false);

          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });

          queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY[0]] });
        },
        onError: (err) => {
          handleDialogStateChange("isDeleteBookDialogOpen", false);

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
    [deleteBookMutate, toast, queryClient, handleDialogStateChange]
  );

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyToClipboard}>
            <Copy />
            Copy book ID
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Eye />
            View book details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handleDialogStateChange("isUpdateBookDialogOpen", true)
            }
          >
            <Edit />
            Edit book
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              handleDialogStateChange("isDeleteBookDialogOpen", true)
            }
            className="text-destructive focus:text-destructive"
          >
            <Trash2 />
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
        <UpdateBookDialog.Header
          title="Edit book"
          description="Make changes to selected book here. Click save when you're done."
          className="text-start"
        />

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={updateBookById}
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormInput name="title" control={control} />
              <FormInput name="author" control={control} />
            </div>
            <FormInput
              name="description"
              control={control}
              component="textarea"
            />
            <FormInput
              name="genre"
              control={control}
              description="Add book genre(s) separated by a comma."
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
            />
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormInput name="pages" control={control} type="number" min={0} />
              <FormInput
                name="totalCopies"
                control={control}
                type="number"
                min={0}
              />
            </div>
            <div className="grid grid-cols-[60fr_40fr] gap-4">
              <FormInput name="publisher" control={control} />
              <FormInput name="publicationDate" control={control} type="date" />
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
          <AlertDialogCancel disabled={isDeleteBookPending}>
            Cancel
          </AlertDialogCancel>
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
