import jwt from "jsonwebtoken";

export function verifiserToken(req, res, next) {
    try {
        const token = req.cookies.jwt;

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET, {
            audience: "app",
            issuer: "DEVOPS",
        }
        );

        req.user = decodeToken;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Ugyldig eller manglende token." });
    }
}