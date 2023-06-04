import db from "../database/database.connection.js";

export async function getTimeLineController(req, res) {
    try {
        const dataForTimeLine = await db.query(`SELECT users.username, posts.description, urls.url,pictures.urlp
        FROM sessions
        JOIN users ON sessions."userId" = users.id
        JOIN posts ON sessions."userId" = posts."userId"
        JOIN urls ON posts."urlId" = urls.id
        JOIN pictures ON users."pictureId" = pictures.id
		LIMIT 20`);
        return res.status(200).send(dataForTimeLine.rows);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getPostController(req, res) {
    try {
        ///preciso: nome do usuario (users.name); descrição (posts.description); url (urls.url)
        //com o sessions.token pego sessions.userId
        //com sessions.userId pego posts.description e posts.urlId
        //com posts.urlId pego urls.url
        //esqueci da merda da picture
        const dataForPublish = await db.query(`SELECT users.username, posts.description, urls.url, pictures.urlp
        FROM sessions
        JOIN users ON sessions."userId" = users.id
        JOIN posts ON sessions."userId" = posts."userId"
        JOIN urls ON posts."urlId" = urls.id
        JOIN pictures ON users."pictureId" = pictures.id
        WHERE sessions.token = $1;`, [res.locals.token])
        return res.status(200).send(dataForPublish.rows);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postLinkController(req, res) {
    const { link, description } = req.body;
    try {
        const returningPostId = await db.query(`WITH url_insert AS (
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
        const { postId } = returningPostId.rows[0];


        const regex = /#(\w+)/g;
        const matches = description?.match(regex);
        const uniqueTags = [...new Set(matches)];
        if (uniqueTags.length === 0) {
            return res.status(200).send("Link postado no banco de dados! (sem tags)");
        }
        if (uniqueTags.length === 1) {
            await db.query(`INSERT INTO tags (name) VALUES ($1) ON CONFLICT DO NOTHING`, [uniqueTags[0]]);
            const tagId = await db.query(`SELECT id AS tagId FROM tags WHERE name = $1`, [uniqueTags[0]]);
            await db.query(`INSERT INTO "postTags" ("postId", "tagId") VALUES ($1, $2)`, [postId, tagId.rows[0].tagid]);


            return res.status(200).send("Link postado no banco de dados! (uma tag)");
        }

        await db.query(`
            INSERT INTO tags (name)
            SELECT unnest($1::text[])
            ON CONFLICT DO NOTHING
            
        `, [uniqueTags]);
        const tagId = await db.query(`SELECT tags.id FROM tags 
                                        WHERE name = ANY($1::text[])`, [uniqueTags]);//tenho um array de objetos


        const tagIdProcessed = tagId.rows.map(ao => ao.id);//agora tenho um array de ids

        await Promise.all(tagIdProcessed.map(async (ti) => {
            await db.query(`INSERT INTO "postTags" ("postId", "tagId") VALUES ($1, $2)`, [postId, ti]);
        }));


        return res.status(200).send("Link postado no banco de dados! (2+ tag)");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}