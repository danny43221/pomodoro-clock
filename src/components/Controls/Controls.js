import React from "react";
import { Button } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";
import ResetIcon from "@material-ui/icons/SettingsBackupRestoreRounded";

const Controls = props => {
	return (
		<div>
			<Button
				onClick={props.onPause}
				size="large"
				variant="contained"
				color={props.isPaused ? "primary" : "secondary"}
				style={{ marginRight: "1rem" }}
				disableElevation
			>
				{props.isPaused ? (
					<>
						play <PlayIcon />
					</>
				) : (
					<>
						pause <PauseIcon />
					</>
				)}
			</Button>
			<Button
				onClick={props.onReset}
				size="large"
				color="primary"
				variant="outlined"
			>
				reset <ResetIcon />
			</Button>
		</div>
	);
};

export default Controls;
