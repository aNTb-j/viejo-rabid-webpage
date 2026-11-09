import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigate = useNavigate();

    const goBackLoginHandler = () => {
        navigate("/login");
    };

    return (
        <div className="text-center mt-5 text-light">
            <h2>¡Oops! La página solicitada no fue encontrada</h2>
            <Button className="mt-3" onClick={goBackLoginHandler}>
                Volver a Iniciar sesión
            </Button>
        </div>
    );
};

export default PageNotFound;