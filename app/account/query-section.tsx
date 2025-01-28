"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// import { auth, db } from "@/lib/firebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";
import React from "react";

interface QuerySectionProps {
  title: string;
}

/**
 *
 * @param title
 * @param children
 * @constructor
 */
export default function QuerySection({ title }: QuerySectionProps) {
  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-start py-2 text-left font-medium hover:underline group">
        <span className="flex items-center">
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2 group-data-[state=open]:rotate-180" />
          {title}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="pl-4 opacity-50">
          No saved queries yet. Queries will appear here once you save
          them.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
