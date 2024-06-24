export class GoalName {
  private static readonly GOAL_NAME_CHARACTERS_LIMIT = 30;

  private readonly _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('Goal name cannot be empty');
    }
    if (value.length > GoalName.GOAL_NAME_CHARACTERS_LIMIT) {
      throw new Error(
        `Goal name length must be less than or equal to ${GoalName.GOAL_NAME_CHARACTERS_LIMIT} characters`,
      );
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
