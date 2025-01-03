import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient } from "@tanstack/react-query";

/** @schema */
import { bookSchema } from "@/schema/book-schema";

/** @types */
import { type Book } from "@/types";
import { type BookSchema } from "@/types/schema-type";

/** @hooks */
import { useAddBook, useGetAllBooks } from "@/hooks/use-book";
import { useToast } from "@/hooks/use-toast";

/** @constants */
import { BOOK_QUERY_KEY } from "@/features/dashboard/constants";

/** @components */
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomDialog as AddBookDialog } from "@/components/ui/custom-dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { Loader } from "@/components/ui/loader";

/** @features */
import { BookTable } from "@/features/book-management/tables/book-table";
import { bookColumns } from "@/features/book-management/tables/columns";

/** @icons */
import { PlusSquare } from "lucide-react";

const BookPage = () => {
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] =
    useState<boolean>(false);

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });

  const { control, handleSubmit, reset } = form;
  const { toast } = useToast();

  const queryClient = new QueryClient();
  const { data: booksData } = useGetAllBooks();
  const {
    mutate: addBookMutate,
    isPending: isAddBookPending,
    data: addBookData,
  } = useAddBook();

  const handleDialogClose = useCallback(() => {
    setIsAddBookDialogOpen(false);
    reset();
  }, [reset]);

  const addBook = handleSubmit((values) => {
    addBookMutate(values, {
      onSuccess: ({ books: newBooksData }) => {
        setIsAddBookDialogOpen(false);
        toast({
          title: "Success",
          description: addBookData?.message,
          className: "bg-green-500 text-white",
        });

        try {
          queryClient.setQueryData(
            [BOOK_QUERY_KEY[0]],
            (oldBooksData: Book[]) => {
              console.log("old data", oldBooksData);
              console.log("new data", newBooksData);

              if (oldBooksData) {
                return [...oldBooksData, newBooksData];
              } else {
                return [newBooksData];
              }
            }
          );
        } catch (err) {
          console.log(err);
          toast({
            title: "Error",
            description: "Failed to update query data.",
            className: "bg-red-500 text-white",
          });
        }
      },
      onError: () => {
        toast({
          title: "Error",
          description: addBookData?.message,
          className: "bg-red-500 text-white",
        });
      },
    });
  });

  return (
    <>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center gap-2 mb-10">
          <h1 className="text-2xl font-bold">Books Data</h1>

          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setIsAddBookDialogOpen(true)}
          >
            Add New Book
            <PlusSquare />
          </Button>
        </div>

        {booksData && <BookTable columns={bookColumns} data={booksData} />}
      </div>

      <AddBookDialog
        open={isAddBookDialogOpen}
        onOpenChange={handleDialogClose}
        className="max-w-md"
      >
        <DialogHeader className="items-start">
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>Fill out the details below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={addBook}
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
            <FormInput name="genre" control={control} />
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

            <DialogFooter className="mt-5 sm:gap-0 gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isAddBookPending}>
                {isAddBookPending ? <Loader size="sm" color="white" /> : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </AddBookDialog>
    </>
  );
};

export default BookPage;
