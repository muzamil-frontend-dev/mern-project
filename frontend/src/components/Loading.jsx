import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center">
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};

export default Loading;
