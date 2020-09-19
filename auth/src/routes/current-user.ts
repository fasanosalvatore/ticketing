import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '@sfticketsproject/common';

const router = express.Router();

router.get('/currentUser', currentUser, (req, res) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
