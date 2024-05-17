import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";

export function QuerySearch() {
  return (
    <div className="d-flex flex-row gap-2">
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search for events"
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
      <Button
        variant="outlined"
      >
        Search
      </Button>
    </div>
  );
}
