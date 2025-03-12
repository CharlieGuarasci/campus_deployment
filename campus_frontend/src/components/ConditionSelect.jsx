import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function ConditionSelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!bg-white !text-gray-900 !border-gray-200 !p-2 hover:!bg-gray-50">
        <SelectValue placeholder="Select condition" />
      </SelectTrigger>
      <SelectContent className="!bg-white !text-gray-900">
        <SelectGroup>
          <SelectItem value="GOOD" className="!bg-white hover:!bg-gray-50">Good</SelectItem>
          <SelectItem value="FAIR" className="!bg-white hover:!bg-gray-50">Fair</SelectItem>
          <SelectItem value="POOR" className="!bg-white hover:!bg-gray-50">Poor</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 