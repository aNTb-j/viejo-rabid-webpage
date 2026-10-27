import BootstrapTable from 'react-bootstrap/Table';


// Tabla generica para reemplazar codigo

const CustomTable = ({
	titles = [],
	data = [],
	rowKey = 'id',
	emptyMessage = 'No hay registros',
	emptyDescription = '',
	emptyColSpan,
	className = '',
}) => {
	const columnsCount = titles.length;

	return (
		<BootstrapTable responsive hover className={className}>

			<thead>
				<tr>
					{titles.map(title => (
						<th key={title.key}>
							{title.label}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.length > 0 ? (
					data.map((item, index) => (
						<tr key={item[rowKey] ?? index}>
							{titles.map(title => (
								<td key={title.key}>
									{title.render ? title.render(item) : item[title.key] ?? '-'}
								</td>
							))}
						</tr>
					))
				) : (
					<tr>
						<td colSpan={emptyColSpan ?? columnsCount}>
							<div>{emptyMessage}</div>
							{emptyDescription && (<p>{emptyDescription}</p>)}
						</td>
					</tr>
				)}
			</tbody>
		</BootstrapTable>
	);
};

export default CustomTable;