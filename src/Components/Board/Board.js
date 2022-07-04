import React, { useState } from "react";
import styles from "./Board.module.css";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";

function Board(props) {
	const [showDropdown, setShowDropdown] = useState(false);
	return (
		<div className={styles.board}>
			{/* Below div is responsible for the top of board (title, count) */}
			<div className={styles.board_top}>
				<div className={styles.board_top_title}>
					<p>{props.board?.title}</p>
					<p style={{ color: "gray" }}>{props.board?.cards?.length}</p>
					{/* 
					props.board?.title => This means that,
					okay if props.board exists, then check for title, otherwise, don't check
					*/}
				</div>
				<div className={styles.board_top_more}>
					<MoreHorizontal onClick={() => setShowDropdown(true)} />
					{/* MoreHorizontal is a icon used from react-feather */}
					{showDropdown && (
						<Dropdown onClose={() => setShowDropdown(false)}>
							<div
								className={styles.board_dropdown}
								onClick={() => props.removeBoard(props.board?.id)}
							>
								<p>Delete Board</p>
							</div>
						</Dropdown>
					)}
				</div>
			</div>
			{/* Below div is responsible for the cards in this board */}
			{/* Below div is the container for cards */}
			<div className={`${styles.board_cards} ${styles.custom_scroll}`}>
				{props.board?.cards?.map((item) => (
					<Card
						key={item.id}
						card={item}
						boardId={props.board.id}
						removeCard={props.removeCard}
						handleDragEnd={props.handleDragEnd}
						handleDragEnter={props.handleDragEnter}
						updateCard={props.updateCard}
					/>
				))}
				<Editable
					displayClass={`${styles.board_cards_add}`}
					text="Add Card"
					placeholder="Enter Card Title"
					onSubmit={(value) => props.addCard(value, props.board.id)}
				/>
				{/* <Card /> */}
			</div>
		</div>
	);
}

export default Board;
