import { Progression } from './progression';

export class HabitStackFeedbuzz {
  constructor(
    public readonly id: string,
    public habitStackName: string,
    public time: Date,
    public progressions: Progression[],
    public readonly userId: string
  ) { }
}
