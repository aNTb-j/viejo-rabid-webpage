import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token)
        return res.status(403).json({ message: "No está autorizado" });
    try {
        const payload = jwt.verify(token, "programacion3-2C-2026");
        console.log(payload);
        
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Hubo un error" });
    }
};