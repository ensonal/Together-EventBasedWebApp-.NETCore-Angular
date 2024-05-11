import { Card, TextField } from "@mui/material";
import { SportSelectForm } from "./SportSelectForm";

export function CreateEventCard(){
    return (
        <Card className="p-3 rounded-3">
        <p className="fs-5 m-0">Event title</p>
        <TextField className="w-100" variant="outlined" color="primary" />
        <p className="fs-5 m-0 mt-3">Description</p>
        <textarea className="form-control"></textarea>
        <p className="fs-5 m-0 mt-3">Sport</p>
        <SportSelectForm />
        <p className="fs-5 m-0 mt-3">Difficulty</p>
        <TextField className="w-100" variant="outlined" />
        <p className="fs-5 m-0 mt-3">Date</p>
        <TextField className="w-100" variant="outlined" />
        <p className="fs-5 m-0 mt-3">Time</p>
        <TextField className="w-100" variant="outlined" />
        <p className="fs-5 m-0 mt-3">Location</p>
        <TextField className="w-100" variant="outlined" />
      </Card>
    );
}