import React, { useState, useEffect } from "react";
import ClockSettings from "../../components/ClockSettings/ClockSettings";
import Display from "../../components/Display/Display";
import Controls from "../../components/Controls/Controls";
import classes from "./PomodoroClock.module.css";

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
		}
	}, [time, settings]);

	return (
		<div className={classes.PomodoroClock}>
			<h1>Pomodoro Clock</h1>
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
		</div>
	);
};

export default PomodoroClock;
