import React from "react";

const RequireProfile = () => {
  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }
  if (userInfo) {
    return (
      <>
        <div className="d-flex">
          <SideMenu />
          <Container>
            <Outlet />
          </Container>
        </div>
      </>
    );
  } else {
    return children;
  }
};

export default RequireProfile;
