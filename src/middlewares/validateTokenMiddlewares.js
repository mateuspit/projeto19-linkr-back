import db from "../database/database.connection.js";

export default function validateToken(schema) {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");
        const { error } = schema.validate({ token }, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(401).send(errorMessages);
        //if (errorMessages) return res.status(401).send("errorMessages");
        try {
            const tokenExists = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
            if (!tokenExists.rows.length) return res.status(401).send("Token não encontrado");

        }
        catch (err) {
            return res.status(500).send(err.message);
        }
        res.locals.token = token;
        next();
    };
}
