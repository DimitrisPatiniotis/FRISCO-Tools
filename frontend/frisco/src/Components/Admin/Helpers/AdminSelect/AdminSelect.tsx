import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Root,
} from "../../../../@/components/ui/select";

interface AdminSelectProps {
    selectTitle: string;
    options: (string[] | number[]);
    onStringOptionChange?: (selectedOption: string) => void;
    onNumberOptionChange?: (selectedOption: number) => void;
}

interface CapitalizeOrDisplayNumber {
    (input: string | number): string;
}

const capitalizeOrDisplayNumber: CapitalizeOrDisplayNumber = (input) => {
    if (typeof input === 'string') {
        return input.charAt(0).toUpperCase() + input.slice(1);
    } else if (typeof input === 'number') {
        return input.toString();
    } else {
        return 'Invalid input';
    }
}

export default function AdminSelect({ selectTitle, options, onStringOptionChange, onNumberOptionChange }: AdminSelectProps) {
    const [selectedOption, setSelectedOption] = React.useState(options[0]);

    const handleSelectItemClick = (value: string) => {
        setSelectedOption(value);
        if (typeof value === "string" && onStringOptionChange) {
            onStringOptionChange(value);
        } else if (typeof value === "number" && onNumberOptionChange) {
            onNumberOptionChange(value);
        }
    };
    return (

        <Select onValueChange={(option) => handleSelectItemClick(option)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectTitle} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.toString()} value={option.toString()} >
                            {capitalizeOrDisplayNumber(option)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
