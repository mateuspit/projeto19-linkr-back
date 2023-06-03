import db from "../database/database.connection.js";

export async function getTimeLineController(req, res) {
    try {

    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postLinkController(req, res) {
    const { link, description } = req.body;
    try {
        const returningData = await db.query(`WITH url_insert AS (
            INSERT INTO urls (url)
            VALUES ($1)
            RETURNING id AS "urlId"
        ), user_data AS (
            SELECT "userId"
            FROM sessions
            WHERE token = 'f5e16715-b3b3-43eb-a575-c612106a1085'
        )
        INSERT INTO posts ("userId", description, "urlId")
        SELECT "userId", $2, "urlId"
        FROM url_insert, user_data
        RETURNING id AS "postId";`, [link, description]);
        //db.query(`INSERT INTO urlstest (description) VALUES ($1)`, [description])
        console.log(returningData);
        return res.status(200).send("Link postado no banco de dados!");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}