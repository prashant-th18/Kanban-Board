import React, { useState } from "react";
import { X } from "react-feather";
import styles from "./Editable.module.css";

function Editable(props) {
	const [showEdit, setShowEdit] = useState(false);
	const [enteredInput, setEnteredInput] = useState(props?.default || "");
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
						if (enteredInput.trim().length && props.onSubmit)
							props.onSubmit(enteredInput);
						setShowEdit(false);
						if (!props.same)
							setEnteredInput(props.default ? props.default : "");
					}}
				>
					<input
						autoFocus // is se cursor automatically input field mai aara
						type="text"
						value={enteredInput}
						onChange={(event) => setEnteredInput(event.target.value)}
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
