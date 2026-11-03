import {
	ResponsiveContainer,
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from 'recharts';



const GenericChart = ({
	title,
	type = 'bar',
	data = [],
	dataKey,
	categoryKey,
	height = 300,
	colors = ['#526b53', '#a3b18a', '#d4a373', '#6c757d']
}) => {

	const renderChart = () => {

		switch (type) {

			case 'bar':
				return (
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={categoryKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey={dataKey} fill={colors[0]} />
					</BarChart>
				);

			case 'line':
				return (
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={categoryKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey={dataKey}
							stroke={colors[0]}
							strokeWidth={2}
						/>
					</LineChart>
				);

			case 'pie':
				return (
					<PieChart>
						<Pie
							data={data}
							dataKey={dataKey}
							nameKey={categoryKey}
							outerRadius={100}
							label
						>
							{data.map((entry, index) => (
								<Cell
									key={index}
									fill={colors[index % colors.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				);

			default:
				return null;
		}
	};

	return (
		<div className="A">
			<h5>{title}</h5>

			<ResponsiveContainer width="100%" height={height}>
				{renderChart()}
			</ResponsiveContainer>
		</div>
	);
};

export default GenericChart;