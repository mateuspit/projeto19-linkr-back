import db from '../database/database.connection.js';

export default async function signupConflictValidation(req, res, next) {
    const { email, username } = req.body;

    try {
        const promise = await db.query(`
            SELECT * 
            FROM public.users
            WHERE email=$1
            LIMIT 1;
        `, [email]);
        if (promise.rowCount !== 0) {
            return res.status(409).send('🚫 E-mail already registered!');
        }

        const promise2 = await db.query(`
            SELECT * 
            FROM public.users
            WHERE username=$1
            LIMIT 1;
        `, [username]);
        if (promise2.rowCount !== 0) {
            return res.status(409).send('🚫 Username already registered!');
        }
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }

    next();
}