import React from "react";
import { Link } from "react-router-dom";

/** @types */
import { type SidebarHeaderProps } from "@/types/props-type";

/** @components */
import { SidebarHeader } from "@/components/ui/sidebar";

/** @icons */
import { BookOpen } from "lucide-react";

export const Header = React.memo(({ link }: SidebarHeaderProps) => {
  return (
    <SidebarHeader>
      <div className="h-8 flex justify-between group-data-[collapsible=icon]:justify-center items-center">
        <h2 className="text-lg font-bold group-data-[collapsible=icon]:hidden">
          Library Centre
        </h2>
        <Link to={link} className="bg-white shadow-md rounded-sm p-1">
          <BookOpen size={20} />
        </Link>
      </div>
    </SidebarHeader>
  );
});

Header.displayName = "SidebarHeader";