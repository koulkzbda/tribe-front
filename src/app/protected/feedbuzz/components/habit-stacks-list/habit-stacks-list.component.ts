import { RepetitionService } from './../../../../core/services/repetition.service';
import { repetitionValidator } from './../../../../shared/validators/repetition-validator';
import { PictureDisplayingService } from './../../../../core/services/picture-displaying.service';
import { StatusConverterService } from './../../../../core/services/status-converter.service';
import { RepetitionStatus } from './../../../../shared/models/enums';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HabitStackFeedbuzz } from './../../../../shared/models/habit-stack-feedbuzz';
import { HabitStackService } from './../../../../core/services/habit-stack.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'app-habit-stacks-list',
  templateUrl: './habit-stacks-list.component.html',
  styleUrls: ['./habit-stacks-list.component.scss']
})
export class HabitStacksListComponent implements OnInit, OnDestroy {

  public editContentPrefilled = false;
  public editContent: boolean[][] = [];
  // public habitStacksPictures: HabitStackFeedbuzz[];
  public habitStacks: HabitStackFeedbuzz[];
  private stackSub: Subscription;
  private picturesSub: Subscription;
  public habitsForm: FormGroup;
  public isPrefilled = false;
  private repetitionSub: Subscription;

  constructor(
    private habitStackService: HabitStackService,
    private fb: FormBuilder,
    private statusConverterService: StatusConverterService,
    public pictureDisplayingService: PictureDisplayingService,
    private repetitionService: RepetitionService
  ) { }

  get habits(): FormArray { return this.habitsForm.get('habits') as FormArray; }

  public repetitions(habitIndex: number): FormArray {
    return this.habits?.at(habitIndex).get('repetitions') as FormArray
  }

  public repetition(habitIndex: number, repetitionIndex: number): FormControl {
    return this.repetitions(habitIndex)?.at(repetitionIndex) as FormControl
  }

  public repetitionPictures(habitIndex: number, repetitionIndex: number): Picture[] {
    return this.habitStacks[habitIndex].progressions[repetitionIndex].repetition.publicationPictures;
  }

  public repetitionStatus(habitIndex: number, repetitionIndex: number): boolean {
    return this.repetition(habitIndex, repetitionIndex)?.get('repetitionStatus').value;
  }

  // public repetitionContent(habitIndex: number, repetitionIndex: number): FormControl {
  //   return this.repetition(habitIndex, repetitionIndex)?.get('content') as FormControl;
  // }

  public metricValues(habitIndex: number, repetitionIndex: number): FormArray {
    return this.repetitions(habitIndex)?.at(repetitionIndex).get('metricValues') as FormArray
  }

  public metricValueValue(habitIndex: number, repetitionIndex: number, valueIndex: number): FormControl {
    return this.metricValues(habitIndex, repetitionIndex)?.at(valueIndex)?.get('value') as FormControl
  }

  ngOnInit(): void {
    this.initForm();
    this.getHabitStackFeedbuzz();
  }

  ngOnDestroy(): void {
    this.stackSub.unsubscribe();
    if (this.repetitionSub) {
      this.repetitionSub.unsubscribe();
    }
  }

  public submitRepetition(habitIndex: number, repetitionIndex: number): void {
    const nbMetrics = this.metricValues(habitIndex, repetitionIndex).length;
    if (!this.repetitionStatus(habitIndex, repetitionIndex) && nbMetrics > 0) {
      for (let index = 0; index < nbMetrics; index++) {
        this.metricValueValue(habitIndex, repetitionIndex, index).reset();

      }
    }

    let repetitionFeedbuzzUpdate = this.repetition(habitIndex, repetitionIndex);

    repetitionFeedbuzzUpdate.patchValue(
      {
        repetitionStatus: this.statusConverterService.booleanToRepetitionStatus(repetitionFeedbuzzUpdate.get('repetitionStatus').value)
      }
    )

    this.repetitionSub = this.repetitionService.updateRepetition(repetitionFeedbuzzUpdate.value, habitIndex, repetitionIndex).subscribe(
      _ => this.setContentAsNotEditable(habitIndex, repetitionIndex)
    );
  }

  public setContentAsEditable(habitIndex: number, repetitionIndex: number): void {
    this.editContent[habitIndex][repetitionIndex] = true;
  }

  public deleteContent(habitIndex: number, repetitionIndex: number): void {
    this.repetition(habitIndex, repetitionIndex).patchValue({
      content: ''
    });
    // this.repetition(habitIndex, repetitionIndex).markAsUntouched();
    this.submitRepetition(habitIndex, repetitionIndex);
  }

  public setContentAsNotEditable(habitIndex: number, repetitionIndex: number): void {
    this.editContent[habitIndex][repetitionIndex] = false;
  }

  public editHabitStack(habitSatck: HabitStackFeedbuzz): void {

  }

  public deleteHabitStack(habitSatck: HabitStackFeedbuzz): void {

  }

  private getHabitStackFeedbuzz(): void {
    this.habitStackService.setHabitStacksFeedbuzz();
    this.stackSub = this.habitStackService.habitStacksFeedbuzz$.subscribe(
      hs => {
        this.habitStacks = hs;
        this.prefillForm(hs);
        // this.habitStackService.setHabitStacksFeedbuzz(this.habitStacks);
        this.initEditContent();
      }
    );
  }

  // private getHabitStackPictures(): void {
  //   this.picturesSub = this.habitStackService.habitStacksFeedbuzz$.subscribe(
  //     hs => {
  //       this.habitStacksPictures = hs;
  //     }
  //   );
  // }

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
                  value: [metric.value, [Validators.required]],
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

  private initEditContent(): void {
    this.habitStacks.forEach(
      hs => {
        const editArray = [];
        hs.progressions.forEach(
          _ => {
            editArray.push(false);
          }
        );
        this.editContent.push(editArray);
      }
    );
    this.editContentPrefilled = true;
  }

}
