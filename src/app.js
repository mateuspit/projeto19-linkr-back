import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import router from './routes/index.routes.js';
import apiPort from "./constants/apiPort.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);

// const port = process.env.PORT || 5000;
app.listen(apiPort, () => {
    console.log(chalk.bgMagenta('\n [Node.js/Express] Server connected SUCCESSFULLY! '), '🖥️⚙️✨');
    console.log(chalk.white(' Server connected on PORT:'), chalk.blue.italic.underline(`${apiPort}`));
});