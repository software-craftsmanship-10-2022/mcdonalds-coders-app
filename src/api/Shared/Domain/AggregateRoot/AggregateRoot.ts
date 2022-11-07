export default abstract class AggregateRoot {
  /** TODO Calisthenics DomainEventCollection */
  /* private events: DomainEvent[] = [];

  constructor() {
    this.events = [];
  }

  protected record(event: DomainEvent): void {
    this.events.push(event);
  }

  protected pull(): DomainEvent[] {
    // eslint-disable-next-line prefer-destructuring
    const events = this.events;
    this.events = [];

    return events;
  } */
}
