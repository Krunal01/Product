import React from "react";

const Btn = ({ title = "Button", onClick, className = "" }) => {
  return (
    <div
      className={`bg-amber-300 px-2 rounded-2xl cursor-pointer w-max ${className}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Btn;
