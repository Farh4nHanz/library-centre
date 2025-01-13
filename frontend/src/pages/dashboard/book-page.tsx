import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/** @schema */
import { bookSchema } from "@/schema/book-schema";

/** @types */
import { type BookSchema } from "@/types/schema-type";

/** @hooks */
import { useAddBook, useGetAllBooks } from "@/hooks/use-book";
import { useToast } from "@/hooks/use-toast";

/** @constants */
import { BOOK_QUERY_KEY } from "@/constants/dashboard";

/** @components */
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Modal as AddBookModal } from "@/components/ui/modal";
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

  const queryClient = useQueryClient();
  const { data: booksData } = useGetAllBooks();
  const { mutate: addBookMutate, isPending: isAddBookPending } = useAddBook();

  const handleDialogClose = useCallback(() => {
    setIsAddBookDialogOpen(false);
    reset();
  }, [reset]);

  const addBook = handleSubmit((values) => {
    addBookMutate(values, {
      onSuccess: (data) => {
        handleDialogClose();

        toast({
          title: "Success",
          description: data.message,
          variant: "success",
        });

        queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY[0]] });
      },
      onError: (err) => {
        setIsAddBookDialogOpen(false);

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
  });

  return (
    <>
      <div className="min-h-screen w-full space-y-6 p-4">
        <div className="flex justify-between items-center gap-2 mb-10">
          <h1 className="text-2xl font-bold">Books Data</h1>

          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setIsAddBookDialogOpen(true)}
          >
            <PlusSquare />
            Add New Book
          </Button>
        </div>

        <BookTable
          key={booksData?.length}
          columns={bookColumns}
          data={booksData || []}
        />
      </div>

      <AddBookModal
        open={isAddBookDialogOpen}
        onOpenChange={handleDialogClose}
        className="max-w-md"
      >
        <AddBookModal.Header
          title="Add New Book"
          description="Fill out the details below."
          className="text-start"
        />

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

            <AddBookModal.Footer className="mt-5 sm:gap-0 gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDialogClose}
                  disabled={isAddBookPending}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isAddBookPending}>
                {isAddBookPending ? <Loader size="sm" color="white" /> : "Add"}
              </Button>
            </AddBookModal.Footer>
          </form>
        </Form>
      </AddBookModal>
    </>
  );
};

export default BookPage;
