export class GoalDTO {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly name: string,
    public readonly description: string,
    public readonly startDate: Date,
    public readonly frequency: number,
    public readonly penaltyId?: number,
  ) {}
}
