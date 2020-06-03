import React from "react";
import classes from "./Display.module.css";

const Display = props => {
	let seconds = props.time % 60;
	let minutes = (props.time - seconds) / 60;
	const formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	console.log(props.onBreak);
	return (
		<div className={classes.Display}>
			<p>{props.onBreak ? "Break" : "Session"}</p>
			{formattedTime}
		</div>
	);
};

export default Display;
