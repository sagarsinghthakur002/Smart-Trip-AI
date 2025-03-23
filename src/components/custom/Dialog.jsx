import React from "react";

export const DialogDescription = ({ children }) => {
  return <p className="text-gray-600">{children}</p>;
};

export const DialogHeader = ({ title }) => {
  return <h2 className="text-xl font-bold">{title}</h2>;
};
