import { Row, Col } from 'react-bootstrap';

import GenericChart from '../../../../shared/graphs/GenericGraph.jsx';

const salesData = [
    { month: 'Enero', total: 120000 },
    { month: 'Febrero', total: 150000 },
    { month: 'Marzo', total: 180000 },
    { month: 'Abril', total: 130000 },
    { month: 'Mayo', total: 210000 },
];

const productsData = [
    { category: 'Remeras', quantity: 30 },
    { category: 'Pantalones', quantity: 20 },
    { category: 'Camperas', quantity: 15 },
    { category: 'Accesorios', quantity: 10 },
];

const DashboardCharts = () => {

    return (
        <div>
            <h2>Dashboard</h2>

            <Row className="g-4">

                <Col xs={12} lg={8}>
                    <GenericChart
                        title="Ventas mensuales"
                        type="bar"
                        data={salesData}
                        dataKey="total"
                        categoryKey="month"
                    />
                </Col>

                <Col xs={12} lg={4}>
                    <GenericChart
                        title="Productos por categoría"
                        type="pie"
                        data={productsData}
                        dataKey="quantity"
                        categoryKey="category"
                    />
                </Col>

                <Col xs={12}>
                    <GenericChart
                        title="Evolución de ventas"
                        type="line"
                        data={salesData}
                        dataKey="total"
                        categoryKey="month"
                    />
                </Col>

            </Row>
        </div>
    );
};

export default DashboardCharts;