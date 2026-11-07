import { Modal, Button } from 'react-bootstrap';

const GenericConfirmModal = ({
	show,
	title,
	message,
	onConfirm,
	onCancel,
	confirmText = "Sí",
	cancelText = "No",
	loading = false
}) => {

	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<Modal show={show} onHide={onCancel} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{message}
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel} disabled={loading}>
					{cancelText}
				</Button>

				<Button variant="danger" onClick={handleConfirm} disabled={loading}>
					{confirmText}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default GenericConfirmModal;
