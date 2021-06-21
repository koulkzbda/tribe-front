import { Progression, ProgressionFeedbuzz, ProgressionOrder } from './progression';

export class HabitStackFeedbuzz {
  constructor(
    public readonly id: string,
    public habitStackName: string,
    public time: Date,
    public progressions: ProgressionFeedbuzz[],
    public readonly userId: string
  ) { }
}

// add weekday[]
export class HabitStack {
  constructor(
    public readonly id: string,
    public habitStackName: string,
    public weekdays: Weekday[],
    public progressions: Progression[],
    public readonly userId: string
  ) { }
}

export class HabitStackCreation {
  constructor(
    public systemId: string,
    public habitStackName: string,
    public weekdays: Weekday[],
    public progressions: Progression[],
    public readonly id?: string,
    public tribeId?: string,
  ) { }
}

export class Weekday {
  constructor(
    public weekday: Day,
    public time: Date
  ) { }
}

export class WeekdayWithActivity {
  public weekday: Day;
  public time: Date;
  public isActive: boolean;

  constructor(weekday: Weekday, isActive: boolean) {
    this.weekday = weekday.weekday;
    this.time = weekday.time;
    this.isActive = isActive;
  }
}

export class Day {
  constructor(
    public label: string,
    public en: string,
    public fr: string
  ) { }
}
