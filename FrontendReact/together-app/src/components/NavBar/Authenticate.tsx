import { useEffect, useState } from 'react';
import { get } from '../../api/axios';
import IUserInfo from '../../api/models/UserInfo';

const Authenticate = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [user, setUser] = useState<IUserInfo>();

  function requestForAuthenticate() {
    get('/Account/isValid').then((response) => {
      if (response.succeeded) {
        setIsAuthenticate(true);
        getUser();
      }
    });
  }
  async function getUser() {
    await get('/Account/GetCurrentUserInfo').then((response) => {
      if (response.succeeded) setUser(response.userInfo);
    });
  }

  useEffect(() => {
    requestForAuthenticate();
  }, [localStorage.getItem('jwToken')]);

  return { isAuthenticate, setIsAuthenticate, user };
};

export default Authenticate;