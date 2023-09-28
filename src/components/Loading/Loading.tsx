import React from "react";
import "./styles.css";

export const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span>Carregando...</span>
    </div>
  );
}