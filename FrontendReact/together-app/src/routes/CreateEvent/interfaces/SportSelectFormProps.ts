import { Dispatch, SetStateAction } from "react";
import { UserEvent } from "../../../api/models/UserEvent";

interface SportSelectFormProps {
    setUserEvent: Dispatch<SetStateAction<UserEvent>>;
}