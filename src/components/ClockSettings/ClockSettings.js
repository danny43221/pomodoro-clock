import React from "react";
import ClockSetting from "./ClockSetting/ClockSetting";
import classes from "./ClockSettings.module.css";

const ClockSettings = props => {
	return (
		<div className={classes.ClockSettings}>
			<ClockSetting
				type="sessionLength"
				value={props.settings.sessionLength}
				onIncrement={props.onIncrement}
				onDecrement={props.onDecrement}
				isPaused={props.isPaused}
			/>
			<ClockSetting
				type="breakLength"
				value={props.settings.breakLength}
				onIncrement={props.onIncrement}
				onDecrement={props.onDecrement}
				isPaused={props.isPaused}
			/>
		</div>
	);
};

export default ClockSettings;
