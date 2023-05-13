import React from "react";

const EmptyContent = ({ text }) => {
  return (
    <div className="d-flex justify-content-center align-items-center empty-layout">
      <h4>{text}</h4>
    </div>
  );
};

export default EmptyContent;
