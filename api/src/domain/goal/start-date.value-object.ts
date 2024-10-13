export class GoalStartDate {
  private readonly _value: string;

  constructor(value: string) {
    this.validateNotEmpty(value);
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  private validateNotEmpty(value: string): void {
    if (!value) {
      throw new Error('Start date cannot be empty');
    }
  }
}
