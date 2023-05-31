import { db } from "../database/database-connection.js"

export async function getPostController(req, res) {
    const { link } = req.body;
    try {
        db.query(`INSERT INTO urlstest (url) VALUES ($1);`, [link]);
        return res.status(200).send("Link postado no banco de dados!");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}