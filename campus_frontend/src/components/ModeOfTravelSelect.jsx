import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function ModeOfTravelSelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!bg-white !text-gray-900 !border-gray-200 !p-2 hover:!bg-gray-50">
        <SelectValue placeholder="Select mode of travel" />
      </SelectTrigger>
      <SelectContent className="!bg-white !text-gray-900">
        <SelectGroup>
          <SelectItem value="TRAIN" className="!bg-white hover:!bg-gray-50">Train</SelectItem>
          <SelectItem value="PLANE" className="!bg-white hover:!bg-gray-50">Plane</SelectItem>
          <SelectItem value="AUTOMOBILE" className="!bg-white hover:!bg-gray-50">Automobile</SelectItem>
          <SelectItem value="BUS" className="!bg-white hover:!bg-gray-50">Bus</SelectItem>
          <SelectItem value="OTHER" className="!bg-white hover:!bg-gray-50">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 