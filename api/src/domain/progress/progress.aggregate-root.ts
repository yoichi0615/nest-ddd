import { AggregateRoot } from '@nestjs/cqrs';

export class Progress extends AggregateRoot {
  private id?: number;
  private goalId: number;
  private date: Date;
  private comment: string;
  private image: string;

  constructor(goalId: number, date: Date, comment: string, image?: string) {
    super();
    this.goalId = goalId;
    this.date = date;
    this.comment = comment;
    this.image = image;
  }

  static create(
    goalId: number,
    date: Date,
    comment?: string,
    image?: string,
  ): Progress {
    if (!goalId || !date) {
      throw new Error('進捗を作成するために必要なデータが不足しています。');
    }

    return new Progress(goalId, date, comment, image);
  }

  getId() {
    return this.id;
  }

  getGoalId() {
    return this.goalId;
  }

  getDate() {
    return this.date;
  }

  getComment() {
    return this.comment;
  }

  getImage() {
    return this.image;
  }
}
