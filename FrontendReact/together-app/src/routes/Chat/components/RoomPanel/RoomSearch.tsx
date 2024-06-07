import { InputAdornment, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export function RoomSearch() {
    return (
        <TextField
            id="input-with-icon-textfield"
            placeholder="Search groups"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon style={{ color: "#474D4B" }} />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            fullWidth
            size="small"
        />
    );
}