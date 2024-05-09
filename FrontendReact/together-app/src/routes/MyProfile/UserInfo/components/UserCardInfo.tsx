import React from 'react';
import IUserInfo from '../../../../api/models/UserInfo';

export function UserCardInfo({ userInfo }: { userInfo: IUserInfo }) {

  return (
    <div className="info-section">
      <p className="fw-normal mt-3 text-dark mb-1">About Me</p>
      <p className="fw-light">
        I am a software developer interested in web and mobile application development.
      </p>
      <p className="fw-normal mt-3 text-dark mb-1">Location</p>
      <div className="d-flex align-items-center">
        <p className="fw-light mb-0 me-2">{userInfo.city}, {userInfo.country}</p>
        <span className="fi fi-tr rounded"></span>
      </div>
      <p className="fw-normal mt-3 text-dark mb-1">Email</p>
      <p className="fw-light">{userInfo.email}</p>
    </div>
  );
}