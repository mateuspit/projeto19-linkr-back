import db from '../database/database.connection.js';

export async function createImageRepository(pictureUrl) {
    try {
        return (
            await db.query(`
                INSERT 
                INTO "public"."pictures" ("url")
                VALUES ($1)
                RETURNING "id"; 
            `, [pictureUrl])
        )
    } catch (err) {
        throw err;
    }    
}