import { repetitionValidator } from './../../../../shared/validators/repetition-validator';
import { PictureDisplayingService } from './../../../../core/services/picture-displaying.service';
import { StatusConverterService } from './../../../../core/services/status-converter.service';
import { RepetitionStatus } from './../../../../shared/models/enums';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HabitStackFeedbuzz } from './../../../../shared/models/habit-stack-feedbuzz';
import { HabitStackService } from './../../../../core/services/habit-stack.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-habit-stacks-list',
  templateUrl: './habit-stacks-list.component.html',
  styleUrls: ['./habit-stacks-list.component.scss']
})
export class HabitStacksListComponent implements OnInit, OnDestroy {

  public habitStacks: HabitStackFeedbuzz[];
  private stackSub: Subscription;
  public customTape = [RepetitionStatus.done, RepetitionStatus.toDo, RepetitionStatus.canceled];
  public habitsForm: FormGroup;
  public isPrefilled = false;

  constructor(
    private habitStackService: HabitStackService,
    private fb: FormBuilder,
    private statusConverterService: StatusConverterService,
    public pictureDisplayingService: PictureDisplayingService
  ) { }

  get habits(): FormArray { return this.habitsForm.get('habits') as FormArray; }

  public repetitions(habitIndex: number): FormArray {
    return this.habits?.at(habitIndex).get('repetitions') as FormArray
  }

  public repetition(habitIndex: number, repetitionIndex: number): FormControl {
    return this.repetitions(habitIndex)?.at(repetitionIndex) as FormControl
  }

  public repetitionStatus(habitIndex: number, repetitionIndex: number): boolean {
    return this.repetition(habitIndex, repetitionIndex).value.repetitionStatus;
  }

  public metricValues(habitIndex: number, repetitionIndex: number): FormArray {
    return this.repetitions(habitIndex)?.at(repetitionIndex).get('metricValues') as FormArray
  }

  ngOnInit(): void {
    this.initForm();
    this.stackSub = this.habitStackService.getHabitStackFeedbuzz().subscribe(
      hs => {
        this.habitStacks = hs;
        this.prefillForm(hs);
      }
    );
  }

  ngOnDestroy(): void {
    this.stackSub.unsubscribe();
  }

  public submitRepetition(habitIndex: number, repetitionIndex: number): void {

  }

  public editHabitStack(habitSatck: HabitStackFeedbuzz): void {

  }

  public deleteHabitStack(habitSatck: HabitStackFeedbuzz): void {

  }

  private initForm(): void {
    this.habitsForm = this.fb.group({
      habits: this.fb.array([])
    });
  }

  private prefillForm(habitStacks: HabitStackFeedbuzz[]): void {
    if (habitStacks) {
      habitStacks.forEach(habitStack => {
        const hs = this.fb.group({
          id: [habitStack.id],
        });
        const repetitions = this.fb.array([]);
        habitStack.progressions.forEach(
          progression => {
            const repetition = this.fb.group({
              id: [progression.repetition.id],
              content: [progression.repetition.content],
              repetitionStatus: this.statusConverterService.repetitionStatusToBoolean(progression.repetition.repetitionStatus),
            },
              { validators: repetitionValidator }
            );
            const metricValues = this.fb.array([]);
            progression.repetition.metrics.forEach(
              metric => {
                const metricValue = this.fb.group({
                  metricId: [metric.metricId],
                  value: [metric.value],
                  metricName: metric.metricName,
                  metricUnit: metric.metricUnit,
                });
                metricValues.push(metricValue);
              }
            );
            repetition.addControl('metricValues', metricValues);
            repetitions.push(repetition);
          });
        hs.addControl('repetitions', repetitions);
        this.habits.push(hs);
      });
      this.isPrefilled = true;
    }
  }

}
