import {
	OrderCancelledEvent,
	Publisher,
	Subjects,
} from '@sfticketsproject/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
