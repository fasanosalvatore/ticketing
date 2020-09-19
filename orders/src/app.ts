import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
	errorHandler,
	NotFoundError,
	currentUser,
} from '@sfticketsproject/common';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
	cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }),
);
app.use(currentUser);
app.use('/api', indexOrderRouter);
app.use('/api', showOrderRouter);
app.use('/api', newOrderRouter);
app.use('/api', deleteOrderRouter);

app.all('*', async () => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
