export class Metric {
  constructor(
    public readonly id: string,
    public readonly metricId: string,
    public metricName: string,
    public metricUnit: string,
    public isPrincipal: boolean,
    public value: number,
  ) { }
}
