import React from "react";
import ArrowLeft from "@material-ui/icons/ArrowLeftSharp";
import ArrowRight from "@material-ui/icons/ArrowRightSharp";
import { IconButton } from "@material-ui/core";
import classes from "./ClockSetting.module.css";

const ClockSetting = props => {
	return (
		<div className={classes.ClockSetting}>
			<h2>
				{props.type === "sessionLength" ? "Session Length" : "Break Length"}
			</h2>
			<div className={classes.Setter}>
				<IconButton
					onClick={() => props.onDecrement(props.type)}
					disabled={props.value === 1 || !props.isPaused}
					color="primary"
					size="small"
				>
					<ArrowLeft />
				</IconButton>
				{props.value}
				<IconButton
					onClick={() => props.onIncrement(props.type)}
					disabled={props.value === 60 || !props.isPaused}
					color="primary"
					size="small"
				>
					<ArrowRight />
				</IconButton>
			</div>
		</div>
	);
};

export default ClockSetting;
