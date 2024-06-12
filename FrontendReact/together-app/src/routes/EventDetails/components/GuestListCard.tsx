import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import "./GuestListCard.css";

export function GuestListCard({ guests }: { guests: any[] }) {
  const navigate = useNavigate();

  const handleClick = (userID: number) => {
    navigate(`/user/${userID}`);
  };
  return (
    <Box className="guest-box d-flex flex-column gap-3 h-100" sx={{ flex: 1 }}>
      <Card className="rounded-4 p-3 h-100" sx={{ boxShadow: 0 }}>
        <Typography variant="h6" className="mb-0">
          Guest List
        </Typography>
        {guests === null ? (
          <div className="mt-2">
            <EmptyState type="guests" height={50} />
          </div>
        ) : (
          <>
            {guests?.map((guest, index) => (
              <div
                key={index}
                className="d-flex flex-column gap-2 mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(guest.userID)}
              >
                <Box className="d-flex flex-row gap-3 p-0">
                  <img
                    src={
                      guest.profileImageUrl
                        ? guest.profileImageUrl
                        : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"
                    }
                    alt="guest"
                    className="rounded-circle"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                  <div className="d-flex flex-column gap-0">
                    <Typography variant="body1">
                      {guest.name} {guest.surname}{" "}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#505050" }}>
                      {" "}
                      ({guest.userName})
                    </Typography>
                  </div>
                </Box>
              </div>
            ))}
          </>
        )}
      </Card>
    </Box>
  );
}
