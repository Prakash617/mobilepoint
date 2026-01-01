import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropDownProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function DropDown({ value, onValueChange }: DropDownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px] bg-gray">
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="price">Price: low to high</SelectItem>
          <SelectItem value="-created_at">Newest</SelectItem>
          <SelectItem value="-price">Price: high to low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
