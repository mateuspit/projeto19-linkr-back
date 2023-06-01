import db from "../database/database.connection.js";

export async function getPostController(req, res) {
    const { link, description } = req.body;
    try {
        db.query(`INSERT INTO urlstest (url,description) VALUES ($1, $2);`, [link, description]);
        //db.query(`INSERT INTO urlstest (description) VALUES ($1)`, [description])
        return res.status(200).send("Link postado no banco de dados!");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}