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
        //db.query(`INSERT INTO urlstest (description) VALUES ($1)`, [description])
        //console.log(returningPostId.rows[0].postId);
        const { postId } = returningPostId.rows[0];


        const regex = /#(\w+)/g;
        const matches = description.match(regex);
        const uniqueTags = [...new Set(matches)];
        //console.log(uniqueTags);
        if (uniqueTags.length === 0) {
            return res.status(200).send("Link postado no banco de dados! (sem tags)");
        }
        if (uniqueTags.length === 1) {
            await db.query(`INSERT INTO tags (name) VALUES ($1) ON CONFLICT DO NOTHING`, [uniqueTags[0]]);
            const tagId = await db.query(`SELECT id AS tagId FROM tags WHERE name = $1`, [uniqueTags[0]]);
            console.log(tagId.rows[0].tagid);
            await db.query(`INSERT INTO "postTags" ("postId", "tagId") VALUES ($1, $2)`, [postId, tagId.rows[0].tagid]);

            //await db.query(`BEGIN;
            //    INSERT INTO tags (name) VALUES ($1) ON CONFLICT DO NOTHING;

            //    INSERT INTO "postTags" ("postId", "tagId")
            //    SELECT $2, tags.id
            //    FROM tags
            //    WHERE tags.name = $1;

            //    COMMIT;
            //`, [uniqueTags[0], postId])

            //await db.query(`
            //    WITH tag_insert AS (
            //        INSERT INTO tags (name)
            //        VALUES ($1)
            //        ON CONFLICT DO NOTHING
            //        RETURNING id AS "tagId"
            //    ), post_tag_insert AS (
            //        INSERT INTO "postTags" ("postId", "tagId")
            //        SELECT $2, tag_insert."tagId"
            //        FROM tag_insert
            //        ON CONFLICT DO NOTHING
            //    )
            //    SELECT *
            //    FROM tag_insert;
            //`, [uniqueTags[0], postId]);



            //await db.query(`
            //    WITH tag_insert AS (
            //        INSERT INTO tags (name)
            //        VALUES ($1)                    
            //        RETURNING id AS "tagId"
            //    ), post_tag_insert AS (
            //        INSERT INTO "postTags" ("postId", "tagId")
            //        SELECT $2, "tagId"
            //        FROM tag_insert
            //    )
            //    SELECT *
            //    FROM tag_insert;
            //`, [uniqueTags[0], postId]);

            //await db.query(`
            //    INSERT INTO tags (name)
            //    VALUES ('test')
            //    ON CONFLICT (name) DO NOTHING;
            //`);

            //console.log(insertTags);
            return res.status(200).send("Link postado no banco de dados! (uma tag)");
            //await db.query(`INSERT INTO (postId,tagId) VALUES ($1,$2),($1,$3),($1,$4)`,[postId, uniqueTags])
        }
        //const insertTags = await db.query(`
        //    INSERT INTO tags (name)
        //    SELECT unnest($1::text[])
        //    RETURNING id;
        //`, [uniqueTags]);

        await db.query(`
            INSERT INTO tags (name)
            SELECT unnest($1::text[])
            ON CONFLICT DO NOTHING
            
        `, [uniqueTags]);
        //const tagId = await db.query(`SELECT id FROM tags WHERE name=unnest($1::text[])`, [uniqueTags]);
        const tagId = await db.query(`SELECT tags.id FROM tags WHERE name = ANY($1::text[])`, [uniqueTags]);

        console.log("tagId",tagId.rows);//tenho um array de objetos
        const tagIdProcessed = tagId.rows.map(ao => ao.id);//agora tenho um array de ids
        //await Promise.all(uniqueTags.forEach(async (ut) => {
        //    await db.query(`INSERT INTO "postTags" ("postId", "tagId") VALUES ($1, $2)`, [postId, ut]);
        //}));
        //pq n posso usar forEach
        //console.log(uniqueTags);

        await Promise.all(tagIdProcessed.map(async (ti) => {
            await db.query(`INSERT INTO "postTags" ("postId", "tagId") VALUES ($1, $2)`, [postId, ti]);
        }));


        return res.status(200).send("Link postado no banco de dados! (2+ tag)");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}