import {
	ExpirationCompleteEvent,
	Publisher,
	Subjects,
} from '@sfticketsproject/common';

export class ExpirationCompletePublisher extends Publisher<
	ExpirationCompleteEvent
> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
