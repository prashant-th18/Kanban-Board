import React from "react";
import { MoreHorizontal } from "react-feather";
import Chip from "../Chip/Chip";
import styles from "./Card.module.css";

function Card() {
	return (
		<div className={styles.card}>
			{/* Our card has three sections:
            1. Top section: More options, Chips
            2. Middle section: Description
            3. Footer section: Date, Tasks
        */}
			<div className={styles.card_top}>
				{/* This contains chips */}
				<div className={styles.card_labels}>
					<Chip text="Frontend" color="green" />
					<Chip close text="Frontend" color="green" />
				</div>
				<MoreHorizontal />
			</div>
		</div>
	);
}

export default Card;
