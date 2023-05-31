import db from '../database/database.connection.js';

export async function postUserRepository( email, hash, username ) {
    try {
        return (
            await db.query(`
                INSERT INTO public.users ( email, password, username ) 
                VALUES ($1, $2, $3)
            `, [email, hash, username])
        )
    } catch (err) {
        throw (err)
    }
}

export async function deleteSessionRepository(id) {
    try {
        return (
            await db.query(`
                DELETE
                FROM public.sessions
                WHERE "userId"=$1;
            `, [id])
        )
    } catch (err) {
        throw (err)
    }
}

export async function postSessionRepository(id, token) {
    try {
        return (
            db.query(`
                INSERT
                INTO public.sessions ("userId", "token")
                VALUES ($1, $2);
            `, [id, token])
        )
    } catch (err) {
        throw (err)
    }
}