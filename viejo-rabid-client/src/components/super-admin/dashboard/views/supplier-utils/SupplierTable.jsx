
import { useEffect, useState } from "react";
import { Table, Alert, Spinner } from "react-bootstrap";

import styles from "../../../../../styles/components/suplierstable.module.scss";

const SuppliersTable = ({ refreshKey = 0 }) => {

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("http://localhost:3000/suppliers");

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "No se pudieron cargar los proveedores.");
                }

                setSuppliers(Array.isArray(data) ? data : data.suppliers ?? []);

            } catch (err) {
                console.error("Error al cargar proveedores:", err);
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        loadSuppliers();
    }, [refreshKey]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <Spinner animation="border" />
                <span>Cargando proveedores...</span>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <section className={styles.tableContainer}>

            <header className={styles.tableHeader}>
                <div>
                    <h4 className={styles.title}>Proveedores</h4>
                    <p className={styles.subtitle}>
                        Listado de proveedores registrados.
                    </p>
                </div>

                <span className={styles.count}>
                    {suppliers.length} proveedores
                </span>
            </header>

            <div className={styles.tableWrapper}>
                <Table responsive hover className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Proveedor</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>

                    <tbody>
                        {suppliers.length > 0 ? (
                            suppliers.map(supplier => (
                                <tr key={supplier.id_supplier}>
                                    <td>{supplier.id_supplier}</td>
                                    <td>{supplier.suppliersName}</td>
                                    <td>{supplier.email || "-"}</td>
                                    <td>{supplier.supplierPhone || "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className={styles.emptyState}>
                                    Todavía no hay proveedores registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        </section>
    );
};

export default SuppliersTable;