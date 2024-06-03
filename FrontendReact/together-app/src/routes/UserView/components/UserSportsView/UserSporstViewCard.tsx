import { UserSport } from "../../../../api/models/UserSport";
import { Typography } from "@mui/material";
import { EmptyState } from "../../../../components/EmptyState/EmptyState";

export function UserSportsViewCard({ sports }: { sports: UserSport[] }) {
  return (
    <div className="d-flex flex-row justify-content-start gap-2">
      {sports.length > 0 ? (
        sports.map((sport) => (
          <div
            key={sport.sportId}
            className="d-flex flex-column gap-2 border rounded-3 mt-2"
            style={{ width: 130 }}
          >
            <div className="text-center mt-3">
              <img
                className="rounded-1 shadow-sm"
                src={sport.imageUrl}
                width="40"
                height="40"
                alt="equipment"
                style={{ objectFit: "cover" }}
              />
            </div>
            <Typography
              variant="body1"
              fontWeight="medium"
              sx={{ color: "#303030" }}
              className="text-center"
            >
              {sport.sportName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#303030" }}
              className="text-center mb-3"
            >
              {sport.level}
            </Typography>
          </div>
        ))
      ) : (
        <div className="mt-2 w-100">
          <EmptyState type="sports" height={50} />
        </div>
      )}
    </div>
  );
}
