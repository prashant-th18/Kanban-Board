import React from "react";
import styles from "./Board.module.css";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";

function Board() {
	return (
		<div className={styles.board}>
			{/* Below div is responsible for the top of board (title, count) */}
			<div className={styles.board_top}>
				<p className={styles.board_top_title}>
					To Do
					<span>2</span>
				</p>
				<MoreHorizontal />
				{/* MoreHorizontal is a icon used from react-feather */}
			</div>
			{/* Below div is responsible for the cards in this board */}
			{/* Below div is the container for cards */}
			<div className={styles.board_cards}>
				<Card />
			</div>
		</div>
	);
}

export default Board;
