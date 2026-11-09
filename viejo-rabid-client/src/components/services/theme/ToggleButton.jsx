import styles from '../../../styles/components/toggle.module.scss';

const ToggleButton = ({
	checked = false,
	onChange,
	name = 'toggle',
	offLabel = 'off',
	onLabel = 'on'
}) => {
	return (
		<label className={styles.switch}>
			<input
				className={styles.cb}
				type="checkbox"
				name={name}
				checked={checked}
				onChange={(e) => onChange?.(e.target.checked)}
			/>

			<span className={styles.toggle}>
				<span className={styles.left}>{offLabel}</span>
				<span className={styles.right}>{onLabel}</span>
			</span>
		</label>
	);
};

export default ToggleButton;