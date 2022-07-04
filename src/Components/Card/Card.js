import React, { useState } from "react";
import { MoreHorizontal, Clock, CheckSquare } from "react-feather";
import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./Card.module.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	// console.log(props, props.desc);
	return (
		<>
			{showModal && (
				<CardInfo
					updateCard={props.updateCard}
					card={props.card}
					boardId={props.boardId}
					onClose={() => setShowModal(false)}
				/>
			)}
			<div
				className={styles.card}
				draggable
				onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)} // ye tb jb ye card source bnega
				onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)} // ye tb ye card target bnega
				onClick={() => setShowModal(true)}
			>
				{/* Our card has three sections:
            1. Top section: More options, Chips
            2. Middle section: Description
            3. Footer section: Date, Sub-Tasks
        	*/}
				<div className={styles.card_top}>
					{/* This contains chips */}
					<div className={styles.card_top_labels}>
						{/* <Chip text="Frontend" color="green" /> */}
						{props.card.labels.map((item, index) => (
							<Chip key={index} text={item.text} color={item.color} />
						))}
					</div>
					<div className={styles.card_top_more}>
						<MoreHorizontal
							onClick={(event) => {
								event.stopPropagation();
								setShowDropdown(true);
							}}
						/>
						{/* MoreHorizontal is a icon used from react-feather */}
						{showDropdown && (
							<Dropdown onClose={() => setShowDropdown(false)}>
								<div
									className={styles.card_dropdown}
									onClick={() => props.removeCard(props.boardId, props.card.id)}
								>
									<p>Delete Card</p>
								</div>
							</Dropdown>
						)}
					</div>
				</div>
				<div className={styles.card_title}>{props.card?.title}</div>
				<div className={styles.card_footer}>
					{props.card?.date && (
						<p>
							<Clock /> {props.card?.date}
						</p>
					)}
					<p>
						<CheckSquare />{" "}
						{/* {
						{props.card?.tasks?.filter((item) => item.completed).length}/{props?.card?.tasks?.length
							}
						} */}
						{props.card.tasks.filter((item) => item.completed).length}
						{" / "}
						{props.card.tasks.length}
					</p>
				</div>
			</div>
		</>
	);
}

export default Card;
