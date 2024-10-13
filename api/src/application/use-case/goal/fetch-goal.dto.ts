export class FetchGoalDto {
  id: number;
  name: string;
  description: string;
  startDate: string;
  frequency: number;

  constructor(
    id: number,
    name: string,
    description: string,
    startDate: string,
    frequency: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.frequency = frequency;
  }
}
