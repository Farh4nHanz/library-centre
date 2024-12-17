import { BookTable } from "@/features/book-management/tables/book-table";
import { bookColumns } from "@/features/book-management/tables/columns";

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
  return (
    <div className="space-y-4 p-4">
      <BookTable columns={bookColumns} data={booksData} />
    </div>
  );
};

export default BookPage;
