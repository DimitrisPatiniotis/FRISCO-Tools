import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../../../@/lib/utils";
import { Button } from "../../../../@/components/ui/button";
import { Calendar } from "../../../../@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../@/components/ui/popover";


interface DatePickerWithRangeProps {
    onFromDateChange: (fromDate: string) => void;
    onToDateChange: (toDate: string) => void;
    className?: string;
}

export function DatePickerWithRange({ className = '', onFromDateChange, onToDateChange }: DatePickerWithRangeProps) {

    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        return {
            from: addDays(new Date(), -6),
            to: new Date(),
        };
    });

    React.useEffect(() => {
        if (date?.from) {
            onFromDateChange(format(date.from, "dd-MM-y"));
        }
        if (date?.to) {
            onToDateChange(format(date.to, "dd-MM-y"));
        }
    }, [date])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
