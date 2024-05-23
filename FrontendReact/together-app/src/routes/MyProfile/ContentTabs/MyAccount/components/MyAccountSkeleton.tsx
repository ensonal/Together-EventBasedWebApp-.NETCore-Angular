import { Card, Divider, Skeleton } from "@mui/material";

export function MyAccountSkeleton() {
  return (
    <Card sx={{ padding: 3, paddingBottom: 1, width: "100%", boxShadow: 0 }}>
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-center align-items-center gap-3 pb-3">
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="circular" width={20} height={20} />
          </div>
          <Divider />
          <div className="forms pt-4 d-flex flex-column gap-1">
            <div className="d-flex flex-row gap-3">
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-1 mb-2">
                  Name
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-1 mb-2">
                  Last Name
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
            </div>
            <div className="d-flex flex-row gap-3">
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Email
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Phone
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
            </div>
            <div className="d-flex flex-row gap-3">
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  City
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
              <div className="w-100">
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Country
                </p>
                <Skeleton variant="rounded" width="100%" height={60} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center mt-2">
            <Skeleton variant="rounded" width={100} height={40} />
          </div>
        </div>
      </div>
    </Card>
  );
}
