import { Skeleton } from "@/components/ui/skeleton";
import { BooksTable } from "@/features/book-management/books-table/data-table";
import { columns } from "@/features/book-management/books-table/columns";

const data = [
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
  return (
    <div className="space-y-4 p-4">
      <BooksTable columns={columns} data={data} />

      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton className="w-full h-12" key={i} />
      ))}
    </div>
  );
};

export default BookPage;
