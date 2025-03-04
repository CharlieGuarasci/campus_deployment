import React from "react";

const ShowHideButton = ({ showPassword, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="show-hide-btn absolute right-0 top-0 h-full
                 bg-white text-black
                 hover:bg-gray-500 transition-all"
      style={{
        width: "80px",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black", 
        borderBottom: "1px solid black",
        fontWeight: "500",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f8f8",
        color: "black",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0"
      }}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  );
};

export default ShowHideButton;
