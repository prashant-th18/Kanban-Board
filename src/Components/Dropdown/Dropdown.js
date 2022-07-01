import React, { useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

function Dropdown(props) {
	const dropdownRef = useRef(null);

	const handleClick = (event) => {
		if (dropdownRef && !dropdownRef.current.contains(event.target)) {
			if (props.onClose) props.onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick, { capture: true });

		return () => {
			document.removeEventListener("click", handleClick, { capture: true });
		};
	});

	return (
		<div
			ref={dropdownRef}
			className={styles.dropdown}
			style={{
				position: "absolute",
				top: "100%",
				right: "0%",
			}}
		>
			{props.children}
		</div>
	);
}

export default Dropdown;
