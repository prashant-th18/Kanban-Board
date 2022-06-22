import React from "react";
import { X } from "react-feather";
import styles from "./Chip.module.css";

// Chip are those labels which will be given to a particualr card by you
function Chip(props) {
	return (
		<div>
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
		</div>
	);
}

export default Chip;
