import { useState } from "react";

/** @components */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/** @hooks */
import { useIsMobile } from "@/hooks/use-mobile";

/** @icons */
import { User2 } from "lucide-react";

export const RecentBorrowers = () => {
  const isMobile = useIsMobile();
  const [openPopover, setOpenPopover] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const togglePopover = (index: number) => {
    setOpenPopover((o) => {
      const newOpenPopover = [...o];
      newOpenPopover[index] = !newOpenPopover[index];
      return newOpenPopover;
    });
  };

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
            <Popover
              key={i}
              open={openPopover[i]}
              onOpenChange={() => togglePopover(i)}
            >
              <PopoverTrigger
                asChild
                onMouseEnter={() => togglePopover(i)}
                onMouseLeave={() => setOpenPopover((o) => o.map(() => false))}
              >
                <div className="h-fit bg-transparent flex min-w-fit w-full justify-between items-center gap-4 p-2 rounded-md hover:bg-black/10 cursor-pointer">
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
              </PopoverTrigger>

              <PopoverContent
                align={isMobile ? "start" : "center"}
                side={isMobile ? "top" : "left"}
                sideOffset={10}
                className="max-w-md"
              >
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
