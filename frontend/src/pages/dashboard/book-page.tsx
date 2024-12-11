import { Skeleton } from "@/components/ui/skeleton";

const BookPage = () => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton className="w-full h-12" key={i} />
      ))}
    </div>
  );
};

export default BookPage;
