import { GoalName } from './goal-name.value-object';
import { GoalStartDate } from './start-date.value-object';

export class Goal {
  constructor(
    readonly id: number,
    readonly userId: number,
    private name: GoalName,
    private description: string,
    private frequency: number,
    private startDate: GoalStartDate,
    private isAchieved: boolean,
  ) {}

  static create(
    userId: number,
    name: GoalName,
    description: string,
    startDate: GoalStartDate,
    frequency: number,
    isAchieved: boolean,
  ): Goal {
    return new Goal(
      null,
      userId,
      name,
      description,
      frequency,
      startDate,
      isAchieved,
    );
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

  getStartDate(): GoalStartDate {
    return this.startDate;
  }

  getIsAchieved(): boolean {
    return this.isAchieved;
  }

  markAsNotAchieved() {
    return (this.isAchieved = false);
  }
}
