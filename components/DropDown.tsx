import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DropDown() {
  return (
    <Select >
      <SelectTrigger className="w-[160px] bg-gray">
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup>
          <SelectLabel>Filter by</SelectLabel>
          <SelectItem value="price-low-to-high">Price: low to high</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-high-to-low">Price: high to low</SelectItem>
        
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
