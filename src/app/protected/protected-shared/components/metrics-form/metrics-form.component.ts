import { metricValidator } from './../../../../shared/validators/metric-validator';
import { Metric } from './../../../../shared/models/metric';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-metrics-form',
  templateUrl: './metrics-form.component.html',
  styleUrls: ['./metrics-form.component.scss']
})
export class MetricsFormComponent implements OnInit, OnDestroy {

  @Input() metricsArray: FormArray;
  public metricsForm: FormGroup;

  get metrics(): FormArray { return this.metricsForm.get("metrics") as FormArray; }
  public metric(metricIndex: number): FormGroup {
    return this.metrics?.at(metricIndex) as FormGroup
  }
  public metricName(metricIndex: number): FormControl {
    return this.metric(metricIndex)?.get('metricName') as FormControl;
  }
  public metricUnit(metricIndex: number): FormControl {
    return this.metric(metricIndex)?.get('metricUnit') as FormControl;
  }
  public isPrincipal(metricIndex: number): FormControl {
    return this.metric(metricIndex)?.get('isPrincipal') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
  }

  public deleteMetric(metricIndex: number): void {
    if (this.metrics.length > 1) {
      this.metrics.removeAt(metricIndex);
    } else {
      this.metric(metricIndex).reset();
      this.metricName(metricIndex).setErrors(null);
    }

  }

  public addMetric(): void {
    this.metrics.push(this.createMetricForm());
  }

  public onMetricInput(metricIndex: number) {
    if (this.metric(metricIndex).hasError('metricNameRequired'))
      this.metricName(metricIndex).setErrors([{ 'metricNameRequired': true }]);
    else
      this.metricName(metricIndex).setErrors(null);
  }

  private initForm(): void {
    this.metricsForm = this.fb.group({
      metrics: this.metricsArray.length ? this.metricsArray : this.fb.array([this.createMetricForm()], [Validators.required])
    });
  }

  private createMetricForm(metric?: Metric): FormGroup {
    return this.fb.group({
      metricName: [metric ? metric.metricName : null],
      metricUnit: [metric ? metric.metricUnit : null],
      id: [metric ? metric.id : null],
      isPrincipal: [metric ? metric.isPrincipal : null],
    },
      { validators: metricValidator });
  }

}
