
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import formStyles from '../../../../styles/components/formlayout.module.scss';

const CollapsibleForm = ({ id, title, description, children, defaultExpanded = false }) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	const contentId = `${id}-content`;

	return (
		<section className={formStyles.formContainer}>
			<Button
				type="button"
				variant="light"
				className={formStyles.toggleButton}
				onClick={() => setIsExpanded((current) => !current)}
				aria-expanded={isExpanded}
				aria-controls={contentId}
			>
				<span className={formStyles.toggleContent}>
					<span className={formStyles.toggleTitle}>{title}</span>

					<span
						aria-hidden="true"
						className={`${formStyles.chevron} ${isExpanded ? formStyles.chevronOpen : ''
							}`}
					>
						⌄
					</span>
				</span>

				{description && (
					<span className={formStyles.toggleDescription}>
						{description}
					</span>
				)}
			</Button>

			<div
				id={contentId}
				className={`${formStyles.formContent} ${isExpanded ? formStyles.formExpanded : ''
					}`}
				aria-hidden={!isExpanded}
				inert={!isExpanded}
			>
				<div className={formStyles.formInner}>{children}</div>
			</div>
		</section>
	);
};

export default CollapsibleForm;
