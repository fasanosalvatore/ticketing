import express, { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import {
	requireAuth,
	validateRequest,
	NotFoundError,
	NotAuthorizedError,
	BadRequestError,
} from '@sfticketsproject/common';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import { TicketupdatedPublisher } from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put(
	'/tickets/:id',
	requireAuth,
	[
		body('title').not().isEmpty().withMessage('Title is required'),
		body('price')
			.isFloat({ gt: 0 })
			.withMessage('Price must be greater than zero'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const ticket = await Ticket.findById(req.params.id);
		if (!ticket) throw new NotFoundError();
		if (ticket.orderId)
			throw new BadRequestError('Cannot update already ordered ticket');
		if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();
		ticket.set({ title: req.body.title, price: req.body.price });
		await ticket.save();
		new TicketupdatedPublisher(natsWrapper.client).publish({
			id: ticket.id,
			title: ticket.title,
			price: ticket.price,
			userId: ticket.userId,
			version: ticket.version,
		});
		res.send(ticket);
	},
);

export { router as updateTicketRouter };
