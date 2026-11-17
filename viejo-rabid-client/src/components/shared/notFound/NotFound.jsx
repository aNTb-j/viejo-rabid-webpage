
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import styles from "../../../styles/components/notfound.module.scss";

const PageNotFound = () => {
	const navigate = useNavigate();

	const [leftPosition, setLeftPosition] = useState(0);
	const [rightPosition, setRightPosition] = useState(0);

	const dragRef = useRef(null);

	const goBackHomeHandler = () => {
		navigate("/home");
	};

	const handlePointerDown = (e, side) => {
		e.currentTarget.setPointerCapture(e.pointerId);

		dragRef.current = {
			side,
			startX: e.clientX,
			initialPosition: side === "left"
				? leftPosition
				: rightPosition,
		};
	};

	const handlePointerMove = (e) => {
		if (!dragRef.current) return;

		const { side, startX, initialPosition } = dragRef.current;

		const movement = e.clientX - startX;

		if (side === "left") {
			setLeftPosition(
				Math.min(0, Math.max(-100, initialPosition + movement / window.innerWidth * 100))
			);
		} else {
			setRightPosition(
				Math.min(100, Math.max(0, initialPosition + movement / window.innerWidth * 100))
			);
		}
	};

	const handlePointerUp = () => {
		dragRef.current = null;
	};

	const isOpen = leftPosition <= -15 || rightPosition >= 15;

	return (
		<main className={styles.notFound}>
			<div className={styles.dressingRoom}>

				<section className={`${styles.message} ${isOpen ? styles.visible : ""}`}>
					<span className={styles.errorCode}>404</span>

					<h1>¡Ups! Parece que te equivocaste de probador.</h1>

					<p>
						La página que estás buscando no está disponible.
					</p>

					<Button
						className={styles.backButton}
						onClick={goBackHomeHandler}
					>
						Volver al inicio
					</Button>
				</section>

				<div
					className={`${styles.curtain} ${styles.curtainLeft}`}
					style={{ transform: `translateX(${leftPosition}%)` }}
					onPointerDown={(e) => handlePointerDown(e, "left")}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerCancel={handlePointerUp}
				/>

				<div
					className={`${styles.curtain} ${styles.curtainRight}`}
					style={{ transform: `translateX(${rightPosition}%)` }}
					onPointerDown={(e) => handlePointerDown(e, "right")}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerCancel={handlePointerUp}
				/>

				{!isOpen && (
					<span className={styles.instruction}>
						Arrastrá las cortinas para descubrir qué pasó...
					</span>
				)}

			</div>
		</main>
	);
};

export default PageNotFound;
