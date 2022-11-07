import {v4} from 'uuid';
import validate from 'uuid-validate';

export default class Identity {
  private readonly id: string;

  constructor(id: string) {
    this.checkIsValidUuid(id);
    this.id = id;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static random(): Identity {
    return new Identity(v4());
  }

  public equals(id: Identity): boolean {
    return id.toString() === this.id && id.constructor.name === this.constructor.name;
  }

  public toString(): string {
    return this.id;
  }

  private checkIsValidUuid(id: string): void {
    if (!validate(id)) {
      // Throw new InvalidArgumentException(`'èsadas'`);
      throw new Error(`Invalid identity with value <$id>`);
    }
  }
}
