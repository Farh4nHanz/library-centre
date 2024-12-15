import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User2 } from "lucide-react";

export const RecentBorrowers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Borrowers</CardTitle>
        <CardDescription>
          Displaying borrowers data from last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              className="h-fit bg-transparent flex min-w-fit w-full justify-between items-center gap-4 p-2 rounded-md hover:bg-black/10 cursor-pointer"
              key={i}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 items-start">
                  <span className="text-[0.95rem] font-semibold cursor-text">
                    Borrower Name
                  </span>
                  <span className="text-sm text-muted-foreground/80 cursor-text">
                    borrower@gmail.com
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
