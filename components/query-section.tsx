"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface QuerySectionProps {
  title: string
  children?: React.ReactNode
}

export function QuerySection({ title, children }: QuerySectionProps) {
  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-start py-2 text-left font-medium hover:underline group">
        <span className="flex items-center">
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2 group-data-[state=open]:rotate-180" />
          {title}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  )
}
