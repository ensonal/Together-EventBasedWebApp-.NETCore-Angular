import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import { UserEvent } from "../../../api/models/UserEvent";

export function EventDatePicker({ setUserEvent }: { setUserEvent: Dispatch<SetStateAction<UserEvent>> }) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    setUserEvent((userEvent: UserEvent) => ({
      ...userEvent,
      eventDate: newDate?.toDate() ?? new Date(),
      eventHour: newDate?.format('HH:mm') ?? '',
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
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
