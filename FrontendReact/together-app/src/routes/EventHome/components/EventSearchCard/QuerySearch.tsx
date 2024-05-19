import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, Card, IconButton } from "@mui/material";

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
      <IconButton className="rounded-2" sx={{border:'1px solid #3D52F3'}}>
        <KeyboardDoubleArrowRightIcon color="primary" fontSize="small"/>
      </IconButton>
    </div>
  );
}
