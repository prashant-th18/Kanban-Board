import { useState } from "react";
import styles from "./App.module.css";
import Board from "./Components/Board/Board";
import Editable from "./Components/Editable/Editable";

function App() {
	const [target, setTarget] = useState({
		cid: "",
		bid: "",
	});

	const searchBoard = (bid) => {
		const index = boards.findIndex((item) => item.id === bid);
		return index;
	};

	const searchCard = (bid, cid) => {
		const bindex = searchBoard(bid);
		if (bindex < 0) return -1;

		const cindex = boards[bindex].cards.findIndex((item) => item.id === cid);
		return cindex;
	};

	const [boards, setBoards] = useState([
		{
			id: Date.now() + Math.random(),
			title: "To Do",
			cards: [
				{
					id: Date.now() + Math.random(),
					title: "Task 1",
					tasks: [], // Sub-Tasks
					labels: [{ text: "Frontend", color: "blue" }],
					desc: "abcd",
					date: "",
				},
				{
					id: Date.now() + Math.random(),
					title: "Task 2",
					tasks: [], // Sub-Tasks
					labels: [{ text: "Backend", color: "red" }],
					desc: "abcd",
					date: "",
				},
			],
		},
	]);

	const addCard = (title, bid) => {
		// bid -> board id(i.e. the id of the board in which we want to insert the card)
		const card = {
			id: Date.now() + Math.random(),
			title,
			tasks: [], // Sub-Tasks
			labels: [],
			desc: "",
			date: "",
		};
		// temporary card created

		const index = searchBoard(bid);
		if (index < 0) return;
		const tempBoards = [...boards];
		tempBoards[index].cards?.push(card);
		setBoards(tempBoards);
	};

	const removeCard = (bid, cid) => {
		// bid -> boardID
		// cid -> cardID
		// So, board, jiski board id "bid" hai, vha jaakr, card jiski card id "cid" hai, usko delete kro

		const cindex = searchCard(bid, cid);
		if (cindex < 0) return;

		const tempBoards = [...boards];
		tempBoards[searchBoard(bid)].cards.splice(cindex, 1);
		setBoards(tempBoards);
	};

	const addBoard = (title) => {
		const temp = {
			id: Date.now() + Math.random(),
			title: title,
			cards: [],
		};
		const tempBoards = [...boards];
		tempBoards.push(temp);
		setBoards(tempBoards);
	};

	const removeBoard = (bid) => {
		const tempBoards = boards.filter((item) => item.id !== bid);
		setBoards(tempBoards);
	};

	const handleDragEnter = (cid, bid) => {
		setTarget({
			cid,
			bid,
		});
	};

	const handleDragEnd = (cid, bid) => {
		// Remove the card having bid and cid, and place it ahead of card having these variables as "target state"
		let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
		// s-> source, t -> target
		// b -> board, c -> card
		s_bIndex = searchBoard(bid);
		if (s_bIndex < 0) return;

		s_cIndex = searchCard(bid, cid);
		if (s_cIndex < 0) return;

		t_bIndex = searchBoard(target.bid);
		if (t_bIndex < 0) return;

		t_cIndex = searchCard(target.bid, target.cid);
		if (t_cIndex < 0) return;

		// Everything good!
		const tempBoards = [...boards];
		const sourceCardCopy = tempBoards[s_bIndex].cards[s_cIndex];

		// Removing source from original place
		tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
		tempBoards[t_bIndex].cards.splice(t_cIndex, 0, sourceCardCopy);
		setBoards(tempBoards);
		// Just above splice line will delete 0 elements from "t_cIndex" and will insert "sourceCardCopy" there
	};

	// Above two functions are made here, and then they will be passed because, in the end we have to delete a card from a board and insert it somewhere else.
	// So, if we manage all these things from here, then it will be easy, as we have access to all the boards here.

	return (
		<div className={styles.app}>
			{/* Navbar */}
			<div className={styles.app_navbar}>
				<h2>Kanban Board</h2>
			</div>
			{/* Body */}
			<div className={styles.app_outer}>
				<div className={styles.app_boards}>
					{boards.map((item) => (
						<Board
							key={item.id}
							board={item}
							removeBoard={removeBoard}
							addCard={addCard}
							removeCard={removeCard}
							handleDragEnd={handleDragEnd}
							handleDragEnter={handleDragEnter}
						/>
					))}
					<div className={styles.app_boards_board}>
						<Editable
							displayClass={`${styles.app_boards_board_add}`}
							text="Add Board"
							placeholder="Enter board title"
							onSubmit={(value) => addBoard(value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
