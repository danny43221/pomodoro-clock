import React, { useState, useEffect } from "react";
import ClockSettings from "../../components/ClockSettings/ClockSettings";
import Display from "../../components/Display/Display";
import Controls from "../../components/Controls/Controls";
import classes from "./PomodoroClock.module.css";
import beep from "../../assets/beep.wav";
import { Paper } from "@material-ui/core";
import ClockIcon from "@material-ui/icons/Schedule";

const PomodoroClock = () => {
	const [time, setTime] = useState(1500); //seconds
	const [onBreak, setOnBreak] = useState(false);
	const [isPaused, setIsPaused] = useState(true);
	const [settings, setSettings] = useState({
		sessionLength: 25,
		breakLength: 5,
	});

	const incrementLengthHandler = type => {
		let newLength;
		setSettings(prev => {
			newLength = prev[type] + 1;
			return {
				...prev,
				[type]: newLength,
			};
		});
		if (!onBreak && type === "sessionLength") {
			setTime(newLength * 60);
		}
		if (onBreak && type === "breakLength") {
			setTime(newLength * 60);
		}
	};

	const decrementLengthHandler = type => {
		let newLength;
		setSettings(prev => {
			newLength = prev[type] - 1;
			return {
				...prev,
				[type]: newLength,
			};
		});
		if (!onBreak && type === "sessionLength") {
			setTime(newLength * 60);
		}
		if (onBreak && type === "breakLength") {
			setTime(newLength * 60);
		}
	};

	const pauseHandler = () => {
		setIsPaused(prev => !prev);
	};

	const resetHandler = () => {
		setIsPaused(true);
		setTime(1500);
		setSettings({ sessionLength: 25, breakLength: 5 });
		setOnBreak(false);
	};

	useEffect(() => {
		let interval = null;
		if (!isPaused) {
			interval = setInterval(() => {
				setTime(prev => prev - 1);
			}, 1000);
		} else if (isPaused && time !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isPaused, time]);

	useEffect(() => {
		if (time <= 0) {
			setOnBreak(prev => {
				setTime(
					prev ? settings.sessionLength * 60 : settings.breakLength * 60
				);
				return !prev;
			});

			const beepAudio = new Audio(beep);
			beepAudio.loop = true;
			beepAudio.play();
			setTimeout(() => {
				beepAudio.loop = false;
			}, 700);
		}
	}, [time, settings]);

	return (
		<Paper elevation={24} className={classes.PomodoroClock}>
			<div style={{ position: "relative", fontSize: "4.6rem" }}>
				<ClockIcon className={classes.ClockIcon} fontSize="inherit" />
				<p className={classes.Title}>Pomodoro</p>
			</div>
			<ClockSettings
				isPaused={isPaused}
				settings={settings}
				onIncrement={incrementLengthHandler}
				onDecrement={decrementLengthHandler}
			/>
			<Display time={time} onBreak={onBreak} />
			<Controls
				isPaused={isPaused}
				onPause={pauseHandler}
				onReset={resetHandler}
			/>
		</Paper>
	);
};

export default PomodoroClock;
