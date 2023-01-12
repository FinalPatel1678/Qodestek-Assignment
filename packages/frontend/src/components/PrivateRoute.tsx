import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { RoutePaths } from "../util/enum";
import { useAppContext } from "../context/app";
import { useAuthContext } from "../context/auth";
import { useAuthService } from "../services/auth.service";

const PrivateRoute: React.FC = () => {
  const appContext = useAppContext();
  const authContext = useAuthContext();

  const token = authContext.getToken();
  const authService = useAuthService(token);
  const navigate: NavigateFunction = useNavigate();
  const [appStarted, setAppStared] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        appContext.setLoading(true, "sign-in");
        const user = await authService.getUserByToken();
        authContext.setUser(user);
      } catch (error) {
        navigate(RoutePaths.SignIn, {
          replace: true,
        });
      } finally {
        appContext.setLoading(false, "sign-in");
      }
    }
    if (!authContext.user) {
      getUser();
    } else {
      setAppStared(true);
    }
  }, [authContext]);

  return appStarted ? <Outlet /> : <></>;
};

export default PrivateRoute;
