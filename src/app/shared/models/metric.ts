export class MetricValue {
  constructor(
    public readonly id: string,
    public readonly metricId: string,
    public metricName: string,
    public metricUnit: string,
    public isPrincipal: boolean,
    public value: number,
  ) { }
}

export class MetricFeedbuzz {
  constructor(
    public readonly metricId: string,
    public metricName: string,
    public metricUnit: string,
    public value: number,
  ) { }
}

export class Metric {
  constructor(
    public metricName: string,
    public metricUnit: string,
    public isPrincipal: boolean,
    public readonly id?: string,
  ) { }
}
