import styles from "./App.module.css";
import Board from "./Components/Board/Board";

function App() {
	return (
		<div className={styles.app}>
			{/* Navbar */}
			<div className={styles.app_navbar}>
				<h2>Kanban</h2>
			</div>
			<div className={styles.app_outer}>
				<div className={styles.app_boards}>
					<Board />
					<Board />
					<Board />
					<Board />
					<Board />
					<Board />
					<Board />
				</div>
			</div>
		</div>
	);
}

export default App;
