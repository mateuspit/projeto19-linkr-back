import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { postUserRepository, deleteSessionRepository, postSessionRepository } from '../repositories/user.repository.js';
import { createImageRepository } from '../repositories/auth.repository.js';

export async function signup(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    try {
        if (pictureUrl) {
            const response = await createImageRepository(pictureUrl);
            const { id: pictureId } = response.rows[0];
            await postUserRepository(email, hash, username, pictureId);
        } else {
            await postUserRepository(email, hash, username);
        }

        return res.status(201).send('✅ User created SUCESSFULLY!');
    } catch (err) {
        return res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}

export async function signin(req, res) {
    const user = res.locals.user;

    try {
        const token = uuid();

        await deleteSessionRepository(user.id);

        await postSessionRepository(user.id, token);
        return res.send({ name: user.name, token });
    } catch (err) {
        res.status(500).send(`🚫 Unexpected server error!\n\n${err.message}`);
    }
}