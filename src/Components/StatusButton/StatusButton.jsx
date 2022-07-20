import React from "react";
import "./StatusButton.css";

const StatusButton = ({ status }) => {
	return (
		<button className={`${status}-btn btn`}>{status.toUpperCase()}</button>
	);
};

export default StatusButton;
