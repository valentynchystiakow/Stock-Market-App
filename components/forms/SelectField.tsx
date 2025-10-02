// imports required components(modules)
import React from 'react'
import {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// creates selectField component
const SelectField = ({name,label,placeholder,options,control,error,required = false} : SelectFieldProps) => {
    return (
        <div className="space-y-2">
            {/*Form label block*/}
            <Label htmlFor={name} className="form-label">{label}</Label>

            {/* Controller block*/}
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    // Select fields section
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        {/* Options section*/}
                        <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {options.map((option) => (
                                <SelectItem value={option.value} key={option.value} className="focus:bg-gray-600 focus:text-white">
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        {/* if there is an error displays it*/}
                        {error && <p className="text-sm text-red-500">{error.message}</p>}
                    </Select>
                )}
            />
        </div>
    )
}

// exports select field component
export default SelectField
