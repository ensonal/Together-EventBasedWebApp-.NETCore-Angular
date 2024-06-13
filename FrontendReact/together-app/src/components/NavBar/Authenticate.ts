import { useEffect, useState } from 'react';
import { get } from '../../api/axios';
import IUserInfo from '../../api/models/UserInfo';

const Authenticate = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [user, setUser] = useState<IUserInfo>();
  const isLandingPage = window.location.pathname === '/' ? true : false;

  async function requestForAuthenticate() {
    if (!isLandingPage) {
      get('/User/isLoginSuccessful').then((response) => {
        if (response.succeeded) {
          setIsAuthenticate(true);
          getUser();
        } else {
          setIsAuthenticate(false);
        }
      });
    }
  }

  async function getUser() {
    await get('/User/GetCurrentUserInfo').then((response) => {
      if (response.succeeded) setUser(response.userInfo);
    });
  }

  useEffect(() => {
    requestForAuthenticate();
  }, [localStorage.getItem('jwToken')]);


  return { isAuthenticate, setIsAuthenticate, user };
};

export default Authenticate;