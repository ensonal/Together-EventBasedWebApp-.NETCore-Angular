import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import { UserEvent } from "../../../api/models/UserEvent";

export function EventDatePicker({ setUserEvent, event }: { setUserEvent: Dispatch<SetStateAction<any>>, event?: any }) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  React.useEffect(() => {
    setSelectedDate(dayjs(event?.eventDate));
  }, [event?.eventDate]);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    setUserEvent((userEvent: UserEvent) => ({
      ...userEvent,
      eventDate: newDate?.toDate() ?? new Date(),
      eventHour: `${newDate?.hour() ?? 0}:${newDate?.minute() ?? 0}`
    }));
  };
  

  return (
    <div className="d-flex flex-column gap-2">
      <p className="fs-5 m-0">Date</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
          <DateTimePicker
            label="With Time Clock"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={selectedDate}
            onChange={handleDateChange}
            disablePast={true}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
