import React from "react";
import { X } from "react-feather";
import styles from "./Chip.module.css";

// Chip are those labels which will be given to a particular card by you
function Chip(props) {
	return (
		<div className={styles.chip} style={{ backgroundColor: props.color }}>
			{props.text}
			{props.close && (
				<X
					onClick={() => {
						if (props.onClose) props.onClose();
						return;
					}}
				/>
			)}
			{/* X brings cross icon */}
		</div>
	);
}

export default Chip;
