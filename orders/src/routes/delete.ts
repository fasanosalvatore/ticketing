import {
	NotAuthorizedError,
	NotFoundError,
	OrderStatus,
	requireAuth,
} from '@sfticketsproject/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { Ticket } from '../models/ticket';
const router = express.Router();

router.delete(
	'/orders/:orderId',
	requireAuth,
	async (req: Request, res: Response) => {
		const order = await Order.findById(req.params.orderId);
		if (!order) throw new NotFoundError();
		if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
		order.status = OrderStatus.Cancelled;
		await order.save();
		new OrderCancelledPublisher(natsWrapper.client).publish({
			id: order.id,
			version: order.version,
			ticket: {
				id: order.ticket.id,
			},
		});
		res.status(204).send(order);
	},
);

export { router as deleteOrderRouter };
