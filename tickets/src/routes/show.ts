import express, { Request, Response } from 'express';
import { NotFoundError } from '@sfticketsproject/common';
import { Ticket } from '../models/Ticket';

const router = express.Router();

router.get('/tickets/:id', async (req: Request, res: Response) => {
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) throw new NotFoundError();
	res.send(ticket);
});

export { router as showTicketRouter };
