import React from "react";
import classes from "./Display.module.css";
import { palette } from "@material-ui/system";
import { Box } from "@material-ui/core";

const Display = props => {
	let seconds = props.time % 60;
	let minutes = (props.time - seconds) / 60;
	const formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	console.log(props.onBreak);

	return (
		<Box
			className={classes.Display}
			color={props.time < 60 ? "secondary.main" : ""}
		>
			<p className={classes.SessionType}>
				{props.onBreak ? "Resting" : "Session"}
			</p>
			<span className={classes.Time}>{formattedTime}</span>
		</Box>
	);
};

export default Display;
