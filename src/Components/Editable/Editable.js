import React, { useState } from "react";
import { X } from "react-feather";
import styles from "./Editable.module.css";

function Editable(props) {
	const [showEdit, setShowEdit] = useState(false);
	const [enteredInput, setEnteredInput] = useState("");
	return (
		<div className={styles.editable}>
			{!showEdit ? (
				<p
					className={`${props.displayClass ? props.displayClass : ""} ${
						styles.editable_display
					}`}
					onClick={() => setShowEdit(true)}
				>
					{props.text || "Add Card"}
				</p>
			) : (
				<form
					className={`${styles.editable_edit} ${
						props.editClass ? props.editClass : ""
					}`}
					onSubmit={(event) => {
						event.preventDefault(); // Stop Refreshing
						if (enteredInput && props.onSubmit) props.onSubmit(enteredInput);
						setEnteredInput("");
						setShowEdit(false);
					}}
				>
					<input
						autoFocus // is se cursor automatically input field mai aara
						type="text"
						value={enteredInput}
						onChange={(event) => setEnteredInput(event.target.value)}
						// defaultValue={props.text}
						placeholder={props.placeholder || "Add Item"}
					/>
					<div className={styles.editable_edit_footer}>
						<button type="submit">{props.buttonText || "Add"}</button>
						<X onClick={() => setShowEdit(false)} />
					</div>
				</form>
			)}
		</div>
	);
}

export default Editable;
