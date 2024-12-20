import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/** @schema */
import { bookSchema } from "@/schema/book-schema";

/** @types */
import { type BookSchema } from "@/types/schema-type";

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
import { FormInput } from "@/components/ui/form-input";

/** @features */
import { BookTable } from "@/features/book-management/tables/book-table";
import { bookColumns } from "@/features/book-management/tables/columns";

/** @icons */
import { PlusSquare } from "lucide-react";
import { Form } from "@/components/ui/form";

const booksData = [
  {
    id: "102oiq01",
    title: "Book 1",
    author: "Author 1",
    pages: 100,
  },
  {
    id: "oq092j1q",
    title: "Book 2",
    author: "Author 2",
    pages: 200,
  },
  {
    id: "qskoq91js",
    title: "Book 3",
    author: "Author 3",
    pages: 300,
  },
];

const BookPage = () => {
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] =
    useState<boolean>(false);

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });

  const { control, handleSubmit } = form;

  const addBook = handleSubmit((values) => {
    console.log(values);
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

        <BookTable columns={bookColumns} data={booksData} />
      </div>

      <AddBookDialog
        open={isAddBookDialogOpen}
        onOpenChange={setIsAddBookDialogOpen}
        className="max-w-md"
      >
        <DialogHeader className="items-start">
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Fill out the details below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-4" onSubmit={addBook}>
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
            <FormInput name="cover" control={control} type="file" />
            <FormInput name="isbn" control={control} description="*Optional" />
            <div className="grid grid-cols-[60fr_40fr] gap-4">
              <FormInput name="publisher" control={control} />
              <FormInput name="publicationDate" control={control} type="date" />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormInput name="pages" control={control} type="number" min={0} />
              <FormInput
                name="totalCopies"
                control={control}
                type="number"
                min={0}
              />
            </div>

            <DialogFooter className="mt-5 sm:gap-0 gap-2">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </AddBookDialog>
    </>
  );
};

export default BookPage;
