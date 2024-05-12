import AuthContext, { UserType } from "../context/AuthContext";
import { useState } from "react";
import axiosApi, { axiosTokenApi } from "../utils/axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>({
    email: null,
    password: null
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const signin = (newUser: UserType, callback: VoidFunction):Promise<boolean> => {
    return axiosApi
      .post(`/account/api/admin_login/`, newUser)
      .then((res: { data: { access_token: string; refresh_token: string; }; }) => {
        setUser({
          email: newUser.email,
          password: ''
        });
        setIsUserLoggedIn(true);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        callback();
        return true;
      })
      .catch(() => {
        setUser({
          email: null,
          password: null
        });
        return false;
      });
  };

  const signout = (callback: VoidFunction) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser({
      email: null,
      password: null
    });
    setIsUserLoggedIn(false);
    callback();
  };

  const checkToken = async (): Promise<boolean | undefined> => {
    const access_token: string | null = localStorage.getItem('access_token');
    const refresh_token: string | null = localStorage.getItem('refresh_token');

    if (access_token === null || refresh_token === null) {
      return false;
    }

    const resetUserAndTokens = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser({
        email: null,
        password: null
      });
      setIsUserLoggedIn(false);
    };

    const payload = {
      access_token: access_token
    };

    return axiosTokenApi
      .post(`account/api/check_token/`, payload)
      .then((res: { data: { email: string; }; }) => {
        setUser({
          email: res.data.email,
          password: ''
        });
        return true;
      })
      .catch((err: { response: { status: number; }; }) => {
        if (err.response && err.response.status !== 403) {
          axiosApi
            .post(`account/api/login/refresh/`, { refresh_token })
            .then((res: { data: { access_token: string; }; }) => {
              axiosTokenApi
                .post(`account/api/check_token/`, {access_token: res.data.access_token})
                .then((res: { data: { email: string; }; }) => {
                  setUser({
                    email: res.data.email,
                    password: ''
                  });
                  return true;
                })
                .catch(() => {
                  resetUserAndTokens();
                  return false;
                });
            })
            .catch(() => {
              resetUserAndTokens();
              return false;
            });
        } else {
          resetUserAndTokens();
          return false;
        }
      });
  }

  const value = { user, isUserLoggedIn, signin, signout, checkToken };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}