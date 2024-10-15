import { Progress } from '../progress/progress.aggregate-root';

export interface IProgressRepository {
  save(progress: Progress): Promise<number>;
}
