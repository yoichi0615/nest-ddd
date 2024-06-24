import { GoalName } from './goal-name.value-object';

export class Goal {
  constructor(
    readonly id: number,
    readonly userId: number,
    private name: GoalName,
    private description: string,
    private frequency: number,
    private startDate: string,
  ) {}

  static create(
    userId: number,
    name: GoalName,
    description: string,
    startDate: string,
    frequency: number,
  ): Goal {
    return new Goal(null, userId, name, description, frequency, startDate);
  }

  getId(): number {
    return this.id;
  }

  getUserId(): number {
    return this.userId;
  }

  getDescription(): string {
    return this.description;
  }

  getFrequency(): number {
    return this.frequency;
  }

  getName(): GoalName {
    return this.name;
  }

  getStartDate(): string {
    return this.startDate;
  }
}
