import { ReactNode } from "react";

import { JwtPayload } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import { userLogout } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { decodeToken } from "../lib/utils/decodeToken";

const PrivetRoute = ({
  role,
  children,
}: {
  role: string[];
  children: ReactNode;
}) => {
  const location = useLocation();
  console.log(location.pathname);
  let user;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/login"}></Navigate>;
  }

  if (token) {
    user = decodeToken(token) as JwtPayload & {
      role: string;
      userEmail: string;
    };
  }

  if (!user) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/login"}></Navigate>;
  }

  if (!role.includes(user?.role)) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/login"}></Navigate>;
  }

  if (!role.includes(user?.role)) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/login"}></Navigate>;
  }

  if (
    role.includes(user?.role) &&
    user?.role !== "superAdmin" &&
    (location.pathname.includes("manage-admin") ||
      location.pathname.includes("add-admin"))
  ) {
    return <Navigate replace={true} to="/user-login" />;
  }

  return <div>{children}</div>;
};

export default PrivetRoute;
