import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";
import { Dayjs } from "dayjs";

export function DateFilter({
  filters,
  setFilters,
  clearDates,
}: {
  filters: EventFilters;
  setFilters: any;
  clearDates: boolean;
}) {
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>(
    null
  );
  const [selectedDateTo, setSelectedDateTo] = React.useState<Dayjs | null>(
    null
  );

  React.useEffect(() => {
    if (clearDates) {
      setSelectedDateFrom(null);
      setSelectedDateTo(null);
    }
  }, [clearDates]);

  const handleDateChange = (name: string, value: any) => {
    setFilters((prevFilters: EventFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="p-0">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker", "DatePicker"]}
          sx={{ padding: 0 }}
        >
          <DatePicker
            label="Date From"
            name="DateFrom"
            className="w-100"
            disableHighlightToday={true}
            slotProps={{ textField: { size: "small" } }}
            value={selectedDateFrom}
            onChange={(date) => {
              setSelectedDateFrom(date);
              handleDateChange("dateFrom", date);
            }}
          />
          <DatePicker
            label="Date To"
            name="DateTo"
            className="w-100"
            disableHighlightToday={true}
            slotProps={{ textField: { size: "small" } }}
            value={selectedDateTo}
            onChange={(date) => {
              setSelectedDateTo(date);
              handleDateChange("dateTo", date);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
