import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function GenderSelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="!bg-white !text-gray-900 !border-gray-200 !p-2 hover:!bg-gray-50">
        <SelectValue placeholder="Select gender" />
      </SelectTrigger>
      <SelectContent className="!bg-white !text-gray-900">
        <SelectGroup>
          <SelectItem value="MALE" className="!bg-white hover:!bg-gray-50">Male</SelectItem>
          <SelectItem value="FEMALE" className="!bg-white hover:!bg-gray-50">Female</SelectItem>
          <SelectItem value="NON_BINARY" className="!bg-white hover:!bg-gray-50">Non-binary</SelectItem>
          <SelectItem value="OTHER" className="!bg-white hover:!bg-gray-50">Other</SelectItem>
          <SelectItem value="PREFER_NOT_TO_SAY" className="!bg-white hover:!bg-gray-50">Prefer not to say</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 