import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
import SideMenu from "./SideMenu";

const RequireAuth = ({ isAdmin = false }) => {
  const { userInfo } = useSelector(loginSelector);

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      {isAdmin && !userInfo.isAdmin && (
        <Navigate to="/login?redirect=/admin" replace={true} />
      )}
      {isAdmin && userInfo.isAdmin && (
        <div className="d-flex">
          <SideMenu />
          <Container>
            <Outlet />
          </Container>
        </div>
      )}
      {userInfo && !isAdmin && (
        <Container>
          <Outlet />
        </Container>
      )}
    </>
  );
  // if (isAdmin && !userInfo.isAdmin) {
  // return <Navigate to="/login?redirect=/admin" replace={true} />;
  //   return <Message>you do not have admin access.</Message>;
  // }

  // if (isAdmin) {
  //   return (
  //     <>
  //       <div className="d-flex">
  //         <SideMenu />
  //         <Container>
  //           <Outlet />
  //         </Container>
  //       </div>
  //     </>
  //   );
  // } else {
  //   return children;
  // }
};

export default RequireAuth;
