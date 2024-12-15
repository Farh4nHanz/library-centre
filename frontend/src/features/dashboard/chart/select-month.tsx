import { useCallback, useMemo } from "react";
import {
  eachMonthOfInterval,
  endOfYear,
  format,
  isAfter,
  isBefore,
  startOfYear,
} from "date-fns";

/** @components */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

/** @context */
import { useMonth } from "@/context/month-context";

export const SelectMonth = () => {
  const { monthState, setMonthState } = useMonth();

  const months = useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    });
  }, []);

  const handleStartMonthChange = useCallback(
    (value: string) => {
      const newStartMonth = new Date(value);
      setMonthState((m) => ({
        ...m,
        startMonth: newStartMonth,
      }));

      if (isAfter(newStartMonth, monthState.endMonth)) {
        setMonthState((m) => ({
          ...m,
          endMonth: newStartMonth,
        }));
      }
    },
    [monthState.endMonth, setMonthState]
  );

  const handleEndMonthChange = useCallback(
    (value: string) => {
      const newEndMonth = new Date(value);
      setMonthState((m) => ({
        ...m,
        endMonth: newEndMonth,
      }));

      if (isBefore(newEndMonth, monthState.startMonth)) {
        setMonthState((m) => ({
          ...m,
          startMonth: newEndMonth,
        }));
      }
    },
    [monthState.startMonth, setMonthState]
  );

  const formatSelectDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <Select
        value={formatSelectDate(monthState.startMonth)}
        onValueChange={handleStartMonthChange}
      >
        <SelectTrigger className="min-w-fit">
          <SelectValue placeholder="Start month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Start Month</SelectLabel>
            {months.map((month) => (
              <SelectItem
                key={`start-${formatSelectDate(month)}`}
                value={formatSelectDate(month)}
              >
                {format(month, "MMMM")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="horizontal" className="w-2" />

      <Select
        value={formatSelectDate(monthState.endMonth)}
        onValueChange={handleEndMonthChange}
      >
        <SelectTrigger className="min-w-fit">
          <SelectValue placeholder="End month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select End Month</SelectLabel>
            {months.map((month) => (
              <SelectItem
                key={`end-${formatSelectDate(month)}`}
                value={formatSelectDate(month)}
                disabled={isBefore(month, monthState.startMonth)}
              >
                {format(month, "MMMM")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
