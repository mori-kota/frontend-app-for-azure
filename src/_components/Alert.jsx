import React, { useContext } from "react";
import AlertContext from '@/_contexts/alert.context';

const alertStyles = {
  padding: "16px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: 400,
};

const severityStyles = {
  success: {
    color: "#0f5132",
    background: "#d1e7dd",
  },
  danger: {
    color: "#842029",
    background: "#f8d7da",
  },
};

export const Alert = () => {
  const [alert] = useContext(AlertContext);

  if (!alert) {
    return null;
  }
  const fullStyles = {
    ...alertStyles,
    ...severityStyles[alert.type],
  };

  return (
    <div className="container">
      <div className="m-3">
        <div style={fullStyles}>{alert.message}</div>
      </div>
    </div>
  );
};