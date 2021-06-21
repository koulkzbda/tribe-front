import { Identity } from './identity';
import { Location } from './location';
import { HabitContract } from './habit-contract';
import { Step } from './step';
import { Repetition } from './repetition';
import { Metric } from './metric';

export class ProgressionFeedbuzz {
  constructor(
    public readonly progressionId: string,
    public habitId: string,
    public habitName: string,
    public gatewayHabit: string,
    public location: Location,
    public repetition: Repetition,
    public nbCompleted: number,
    public identities: Identity[],
    public preparationHabit: Step,
    public conditioningStep: Step,
    public reward: Step,
    public habitContract: HabitContract,
    public executionOrder: number,
  ) { }
}

export class Progression {
  constructor(
    public habitName: string,
    public gatewayHabit: string,
    public location: Location,
    public identities: Identity[],
    public preparationHabit: Step,
    public conditioningStep: Step,
    public reward: Step,
    public habitContract: HabitContract,
    public versionName: string,
    public executionOrder: number,
    public metrics: Metric[],
    public habitId?: string,
    public progressionId?: string,
    public nbCompleted?: number,
    public justCreated?: boolean,
  ) { }
}

export class ProgressionOrder {
  constructor(
    public executionOrder: number,
    public readonly progressionId?: string,
  ) { }
}
