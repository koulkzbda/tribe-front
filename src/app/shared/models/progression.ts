import { Location } from './location';
import { HabitContract } from './habit-contract';
import { Step } from './step';
import { Repetition } from './repetition';

export class Progression {
  constructor(
    public readonly progressionId: string,
    public habitId: string,
    public habitName: string,
    public gatewayHabit: string,
    public location: Location,
    public repetition: Repetition,
    public nbCompleted: number,
    public identities: string[],
    public identityCategories: string[],
    public preparationHabit: Step,
    public conditioningStep: Step,
    public reward: Step,
    public habitContract: HabitContract,
  ) { }
}
