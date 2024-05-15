import { Button, Card } from "@mui/material";
import { useState, useEffect } from "react";
import { UserEvent } from "../../../../api/models/UserEvent";
import { useNavigate } from "react-router-dom";

export function MyEvents(){
    const [userEvents, setUserEvents] = useState([] as UserEvent[]);

    const navigate = useNavigate();


    return (
        <Card sx={{ padding: 3, paddingBottom: 1 }} variant="outlined">
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-row flex-wrap gap-3 w-100 justify-content-center">
          {/*sports?.length > 0 ? (
            sports.map((sport) => (
              <SportCard key={sport.userSportId} {...sport} />
            ))
          ) : (
            <div className="text-center w-100">No sports found</div>
          )*/}
          <div className="text-center mt-2 w-100">
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => navigate("/create-event")}
            >
              Create new event
            </Button>
          </div>
        </div>
      </div>
    </Card>
    )
}