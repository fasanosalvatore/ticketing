import {
	Publisher,
	Subjects,
	TicketUpdatedEvent,
} from '@sfticketsproject/common';

export class TicketupdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
