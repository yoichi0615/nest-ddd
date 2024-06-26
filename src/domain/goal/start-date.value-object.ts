export class GoalStartDate {
  private readonly _value: string;

  constructor(value: string) {
    this.validateNotEmpty(value);
    this.validateNotPastDate(value);
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

  private validateNotPastDate(value: string): void {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      throw new Error('Start date must be today or in the future');
    }
  }
}
