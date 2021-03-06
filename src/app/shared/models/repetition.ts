import { Picture } from './picture';
import { MetricValue, MetricFeedbuzz } from './metric';

export class Repetition {
  constructor(
    public readonly id: string,
    public content: string,
    public nbLikes: number,
    public nbComments: number,
    public publicationPictures: Picture[],
    public repetitionStatus: string,
    public repetitionStatusId: string,
    public metrics: MetricValue[],
  ) { }
}

export class RepetitionFeedbuzzUpdate {
  constructor(
    public readonly id: string,
    public content: string,
    public repetitionStatus: string,
    public metricValues: MetricFeedbuzz[],
  ) { }
}
