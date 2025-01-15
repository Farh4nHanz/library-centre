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
import { Modal as DetailBookModal } from "@/components/ui/modal";
import { Modal as UpdateBookModal } from "@/components/ui/modal";
import { DialogClose } from "@/components/ui/dialog";
import { CustomAlertDialog as DeleteBookAlertDialog } from "@/components/ui/alert/custom-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert/alert-dialog";
import { Loader } from "@/components/ui/loader";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/** @features */
import { StarRating } from "@/features/book-management/star-rating";

/** @icons */
import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

export const ColumnActions = ({ book }: { book: Book }) => {
  const [dialogState, setDialogState] = useState<{
    isDetailBookDialogOpen: boolean;
    isUpdateBookDialogOpen: boolean;
    isDeleteBookDialogOpen: boolean;
  }>({
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
      genre: Array.from(book.genre).join(", ").trim(),
      isbn: book.isbn ? (String(book.isbn) as unknown as number) : book.isbn,
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

  const releasedBookDate = new Intl.DateTimeFormat("us-EN", {
    dateStyle: "medium",
  }).format(new Date(book.publicationDate));

  const totalReviews = new Intl.NumberFormat("us-EN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(10200);

  return (
    <>
      {/* dropdown actions */}
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

          <DropdownMenuItem
            onClick={() =>
              handleDialogStateChange("isDetailBookDialogOpen", true)
            }
          >
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

      {/* book detail modal */}
      <DetailBookModal
        open={dialogState.isDetailBookDialogOpen}
        onOpenChange={() =>
          handleDialogStateChange("isDetailBookDialogOpen", false)
        }
        className="max-w-md min-w-fit"
      >
        <DetailBookModal.Header
          title="Detail Book"
          description="View book details here."
          className="text-start"
        />

        {/* book details */}
        <div className="grid grid-cols-[40fr_60fr] gap-5 mb-5">
          {/* left column, book cover */}
          <img
            src={book.coverURL}
            alt={book.title}
            className="size-auto border rounded-lg shadow-lg object-cover place-self-center md:self-center self-start"
          />

          {/* right column */}
          <div className="space-y-5">
            {/* book title, author, and released date */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-bold">{book.title}</h1>
              <div className="space-y-1">
                <h3 className="text-sm text-blue-500 underline">
                  {book.author}
                </h3>
                <h3 className="text-sm text-muted-foreground">
                  Released on {releasedBookDate}
                </h3>
              </div>
            </div>

            {/* book genre(s) */}
            <div className="flex items-start gap-2">
              <span className="text-sm text-slate-800 font-medium">Genre:</span>
              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(book.genre).map((_, i) => (
                  <Badge variant="secondary" key={`genre-${i}`}>
                    {book.genre[i]}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 py-4 gap-4">
              {/* rating and total reviews */}
              <div className="flex flex-col justify-center items-center border-r border-gray-300 pr-4">
                <div className="flex items-center gap-1">
                  <span className="font-medium">4,7</span>
                  <StarRating className="fill-amber-500" />
                </div>

                <span className="text-muted-foreground text-xs text-center text-nowrap">
                  {totalReviews} reviews
                </span>
              </div>

              <div className="flex justify-center items-center border-r border-gray-300 pr-4">
                <span>4,7</span>
              </div>
              <div className="flex justify-center items-center">
                <span>4,7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* book description */}
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">About this eBook</h1>
            <p className="text-[0.85rem]">{book.description}</p>
          </div>

          {/* book rating */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-semibold">Rating</h1>

            <div className="grid grid-cols-[20fr_80fr] gap-2">
              <div className="flex flex-col space-y-2 items-center justify-center">
                {/* rating number */}
                <h1 className="font-semibold text-xl">{book.rating}</h1>

                {/* star rating indicator */}
                <div className="inline-flex gap-0">
                  {Array.from({ length: Math.floor(book.rating) }, (_, i) => (
                    <StarRating
                      key={`filled-star-${i}`}
                      className="fill-amber-500"
                    />
                  ))}
                  {Array.from(
                    { length: 5 - Math.floor(book.rating) },
                    (_, i) => (
                      <StarRating
                        key={`empty-star-${i}`}
                        className="fill-gray-500"
                      />
                    )
                  )}
                </div>

                {/* total book rating */}
                <p className="text-xs text-muted-foreground">
                  Total {book.totalRating.length}
                </p>
              </div>

              {/* rating indicator */}
              <div className="flex flex-col justify-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    className="flex flex-nowrap items-center gap-3"
                    key={`rate-${i}`}
                  >
                    <span className="text-sm">{i + 1}</span>
                    <Progress
                      value={
                        book.totalRating.filter((r) => r === i + 1).length || 0
                      }
                      className="bg-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DetailBookModal>

      {/* update book modal */}
      <UpdateBookModal
        open={dialogState.isUpdateBookDialogOpen}
        onOpenChange={handleUpdateBookDialogClose}
        className="max-w-md"
      >
        <UpdateBookModal.Header
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

            <UpdateBookModal.Footer>
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
            </UpdateBookModal.Footer>
          </form>
        </Form>
      </UpdateBookModal>

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
