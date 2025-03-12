import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function YearOfStudySelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!bg-white !text-gray-900 !border-gray-200 !p-2 hover:!bg-gray-50">
        <SelectValue placeholder="Select year of study" />
      </SelectTrigger>
      <SelectContent className="!bg-white !text-gray-900">
        <SelectGroup>
          <SelectItem value="1" className="!bg-white hover:!bg-gray-50">First Year</SelectItem>
          <SelectItem value="2" className="!bg-white hover:!bg-gray-50">Second Year</SelectItem>
          <SelectItem value="3" className="!bg-white hover:!bg-gray-50">Third Year</SelectItem>
          <SelectItem value="4" className="!bg-white hover:!bg-gray-50">Fourth Year</SelectItem>
          <SelectItem value="5+" className="!bg-white hover:!bg-gray-50">Fifth Year or Above</SelectItem>
          <SelectItem value="GRAD" className="!bg-white hover:!bg-gray-50">Graduate Student</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 