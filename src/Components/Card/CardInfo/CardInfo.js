import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import Modal from "../../Modal/Modal";
import Editable from "../../Editable/Editable";
import Chip from "../../Chip/Chip";
import styles from "./CardInfo.module.css";

function CardInfo(props) {
	const colors = [
		"#a8193d",
		"#4fcc25",
		"#1ebffa",
		"#8da377",
		"#9975bd",
		"#cf61a1",
		"#240959",
	];

	// const { id, title, tasks, labels, desc, date } = props.card;

	const [values, setValues] = useState({ ...props.card });

	// To know which color is currently active
	const [activeColor, setActiveColor] = useState("");

	// Function to know the percentage of the tasks completed
	const calculatePercent = () => {
		if (values.tasks?.length === 0) return "0";

		const completed = values.tasks?.filter((item) => item.completed).length;

		return (completed / values.tasks?.length) * 100 + "";
	};

	useEffect(() => {
		props.updateCard(props.card.id, props.boardId, values);
	}, [props, values]);

	const addLabel = (value, color) => {
		const index = values?.labels?.findIndex((item) => item.text === value);
		if (index >= 0) return; // Already present

		const label = {
			text: value,
			color,
		};
		setValues((prevState) => {
			return {
				...prevState,
				labels: [...prevState.labels, label],
			};
		});
		setActiveColor("");
	};

	const removeLabel = (text) => {
		const index = values.labels?.findIndex((item) => item.text === text);
		if (index < 0) return;

		setValues((prevState) => {
			const nLabels = prevState.labels.filter((item) => item.text !== text);
			return {
				...prevState,
				labels: nLabels,
			};
		});
	};

	const addTask = (value) => {
		const task = {
			id: Math.random() + Date.now(),
			text: value,
			completed: false,
		};
		setValues((prevState) => {
			return {
				...prevState,
				tasks: [...prevState.tasks, task],
			};
		});
	};

	const removeTask = (id) => {
		const index = values.tasks?.findIndex((item) => item.id === id);
		if (index < 0) return;

		setValues((prevState) => {
			const nTasks = prevState.tasks?.filter((item) => item.id !== id);
			return {
				...prevState,
				tasks: nTasks,
			};
		});
	};

	const updateTask = (id, completed) => {
		const index = values.tasks?.findIndex((item) => item.id === id);
		if (index < 0) return;

		setValues((prevState) => {
			const nTasks = prevState.tasks;
			nTasks[index].completed = completed;
			return {
				...prevState,
				tasks: nTasks,
			};
		});
	};

	return (
		<Modal onClose={() => props.onClose()}>
			<div className={`${styles.cardinfo} `}>
				{/* Title */}
				<div className={styles.cardinfo_box}>
					<div className={styles.cardinfo_box_title}>
						<Type />
						Title
					</div>
					<div className={styles.cardinfo_box_body}>
						<Editable
							same
							text={values.title}
							default={values.title}
							placeholder={"Enter Text Here"}
							buttonText={"Set Title"}
							onSubmit={(value) =>
								setValues((prevState) => {
									return { ...prevState, title: value };
								})
							}
						/>
					</div>
				</div>
				{/* Description */}
				<div className={styles.cardinfo_box}>
					<div className={styles.cardinfo_box_title}>
						<List />
						Description
					</div>
					<div className={styles.cardinfo_box_body}>
						<Editable
							text={values.desc.length === 0 ? "Set Description" : values.desc}
							same
							default={values.desc}
							placeholder={"Enter Desc Here"}
							buttonText={"Set Description"}
							onSubmit={(value) =>
								setValues((prevState) => {
									return { ...prevState, desc: value };
								})
							}
						/>
					</div>
				</div>
				{/* Date */}
				<div className={styles.cardinfo_box}>
					<div className={styles.cardinfo_box_title}>
						<Calendar />
						Date
					</div>
					<div className={styles.cardinfo_box_body}>
						<input
							type={"date"}
							// 2022-07-04-..
							defaultValue={
								values.date
									? new Date(values.date).toISOString().substring(0, 9)
									: ""
							}
							onChange={(event) =>
								setValues((prevState) => {
									return { ...prevState, date: event.target.value };
								})
							}
						/>
					</div>
				</div>
				{/* Labels */}
				<div className={styles.cardinfo_box}>
					<div className={styles.cardinfo_box_title}>
						<Tag />
						Labels
					</div>
					{/* Div for chips */}
					<div className={styles.cardinfo_box_labels}>
						{values.labels?.map((item, index) => (
							<Chip
								close
								onClose={() => removeLabel(item.text)}
								key={item.text + index}
								text={item.text}
								color={item.color}
							/>
						))}
					</div>
					<div className={styles.cardinfo_box_colors}>
						{colors.map((item, index) => (
							<li
								key={index}
								style={{ backgroundColor: item }}
								className={activeColor === item ? `${styles.active}` : ""}
								onClick={() => setActiveColor(item)}
							/>
						))}
					</div>
					<div className={styles.cardinfo_box_body}>
						<Editable
							text={"Add Label"}
							placeholder={"Enter label"}
							buttonText={"Add"}
							default={""}
							onSubmit={(value) => {
								addLabel(value, activeColor);
							}}
						/>
					</div>
				</div>
				{/* Tasks */}
				<div className={styles.cardinfo_box}>
					<div className={styles.cardinfo_box_title}>
						<CheckSquare />
						Tasks
					</div>
					{/* Progress Bar */}
					<div className={styles.cardinfo_box_progress_bar}>
						<div
							className={styles.cardinfo_box_progress}
							style={{
								width: calculatePercent() + "%",
								backgroundColor:
									calculatePercent() === "100" ? "limegreen" : "",
							}}
						></div>
					</div>
					{/* Task List */}
					<div className={styles.cardinfo_box_list}>
						{values.tasks?.map((item) => (
							<div className={styles.cardinfo_task}>
								<input
									type={"checkbox"}
									defaultChecked={item.completed}
									onChange={(event) =>
										updateTask(item.id, event.target.checked)
									}
								/>
								<p>{item.text}</p>
								<Trash onClick={() => removeTask(item.id)} />
							</div>
						))}
					</div>
					<div className={styles.cardinfo_box_body}>
						<Editable
							text={"Add new task"}
							placeholder={"Enter Task Here"}
							buttonText={"Set Tasks"}
							onSubmit={(value) => addTask(value)}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default CardInfo;
