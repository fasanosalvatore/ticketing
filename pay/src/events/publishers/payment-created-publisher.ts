import {
	PaymentCreatedEvent,
	Publisher,
	Subjects,
} from '@sfticketsproject/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
