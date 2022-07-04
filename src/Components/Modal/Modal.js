import React from "react";
import styles from "./Modal.module.css";

function Modal(props) {
	return (
		<div
			className={styles.modal}
			onClick={() => (props.onClose ? props.onClose() : "")}
		>
			<div
				className={`${styles.modal_content} ${styles.custom_scroll}`}
				onClick={(event) => event.stopPropagation()}
			>
				{props.children}
			</div>
		</div>
	);
}

export default Modal;
