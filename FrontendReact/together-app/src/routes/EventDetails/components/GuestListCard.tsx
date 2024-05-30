import { Box, Card, Typography } from "@mui/material";

export function GuestListCard({ guests }: { guests: any[] }) {
  return (
    <Box className="d-flex flex-column gap-3 h-100" sx={{ flex: 1 }}>
      <Card className="rounded-4 p-3 h-100" sx={{ boxShadow: 0 }}>
        <Typography variant="h6" className="mb-0">
          Guest List
        </Typography>
        {guests === null ? (
          <Typography variant="body1" className="mt-2">
            No guests yet
          </Typography>
        ) : (
          <>
            {guests?.map((guest, index) => (
              <div key={index} className="d-flex flex-column gap-2 mt-2">
                <Box className="d-flex flex-row gap-3 p-0">
                  <img
                    src={guest.profileImageUrl}
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
