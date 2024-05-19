import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function DateFilter() {
  return (
    <div className="p-0">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]} sx={{padding: 0}}>
          <DatePicker label="Date From" name="DateFrom" className="w-100" disableHighlightToday={true} slotProps={{ textField: { size: 'small' } }}/>
          <DatePicker label="Date To" name="DateTo" className="w-100" disableHighlightToday={true} slotProps={{ textField: { size: 'small' } }}/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
