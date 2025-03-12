import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function CategorySelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!bg-white !text-gray-900 !border-gray-200 !p-2 hover:!bg-gray-50">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="!bg-white !text-gray-900">
        <SelectGroup>
          <SelectItem value="BOOKS" className="!bg-white hover:!bg-gray-50">Books</SelectItem>
          <SelectItem value="SUBLETS" className="!bg-white hover:!bg-gray-50">Sublets</SelectItem>
          <SelectItem value="ROOMMATES" className="!bg-white hover:!bg-gray-50">Roommates</SelectItem>
          <SelectItem value="RIDESHARE" className="!bg-white hover:!bg-gray-50">Rideshare</SelectItem>
          <SelectItem value="EVENTS" className="!bg-white hover:!bg-gray-50">Events</SelectItem>
          <SelectItem value="OTHER" className="!bg-white hover:!bg-gray-50">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 