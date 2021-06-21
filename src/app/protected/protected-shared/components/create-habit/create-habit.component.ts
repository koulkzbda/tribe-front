import { stepValidator } from './../../../../shared/validators/step-validator';
import { TimeService } from './../../../../shared/utils/time.service';
import { metricValidator } from './../../../../shared/validators/metric-validator';
import { LocationService } from './../../../../core/services/location.service';
import { StepService } from './../../../../core/services/step.service';
import { TranslationService } from './../../../../core/services/translation.service';
import { HabitStackService } from './../../../../core/services/habit-stack.service';
import { SystemService } from './../../../../core/services/system.service';
import { TribeService } from './../../../../core/services/tribe.service';
import { Progression } from './../../../../shared/models/progression';
import { HabitStack } from './../../../../shared/models/habit-stack';
import { Tribe } from './../../../../shared/models/tribe';
import { System } from './../../../../shared/models/system';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormArray, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { Step } from '../../../../shared/models/step';
import { HabitContract } from '../../../../shared/models/habit-contract';
import { Identity } from 'src/app/shared/models/identity';
import { Metric } from 'src/app/shared/models/metric';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.scss']
})
export class CreateHabitComponent implements OnInit {

  @Output() habitFormSubmitted = new EventEmitter<boolean>();
  public habitForm: FormGroup;
  public systems: System[];
  private sysSub: Subscription;
  public tribes: Tribe[] = [];
  private tribeSub: Subscription;
  public steps: Step[];
  private stepSub: Subscription;
  private submitSub: Subscription;

  public selectedTribeIndex: number;
  public selectedSystemIndex: number;
  public systemSelected: System;
  public selectedHabitStack: HabitStack;
  public filteredProgressions: Observable<Progression[]>;
  public filteredHabitStacks: Observable<HabitStack[]>;
  public isUpdatingExistingHabit = false;
  public habitSelected: Progression;
  public independantHabitName = {
    en: 'Independant Habit',
    fr: 'Habitude Indépendante'
  };

  constructor(
    private tribeService: TribeService,
    private systemService: SystemService,
    private habitStackService: HabitStackService,
    private timeService: TimeService,
    private stepService: StepService,
    private locationService: LocationService,
    private fb: FormBuilder,
    public translationService: TranslationService
  ) { }


  get id(): AbstractControl { return this.habitForm.get('id'); }
  get habitStackName(): AbstractControl { return this.habitForm.get('habitStackName'); }
  get independantHabitNameTrans(): string { return this.independantHabitName[this.translationService.getCurrentLang()]; }
  get weekdays(): FormArray { return this.habitForm.get('weekdays') as FormArray; }
  get progression(): AbstractControl { return this.habitForm.get('progression'); }
  get habitName(): AbstractControl { return this.progression?.get('habitName'); }
  get versionName(): AbstractControl { return this.progression?.get('versionName'); }
  get gatewayHabit(): AbstractControl { return this.progression?.get('gatewayHabit'); }
  get executionOrder(): AbstractControl { return this.progression?.get('executionOrder'); }
  get preparationHabit(): FormGroup { return this.progression?.get('preparationHabit') as FormGroup; }
  get conditioningStep(): FormGroup { return this.progression?.get('conditioningStep') as FormGroup; }
  get reward(): FormGroup { return this.progression?.get('reward') as FormGroup; }
  // get habitContract(): FormGroup { return this.progression?.get('habitContract') as FormGroup; }
  get identities(): AbstractControl { return this.progression?.get('identities'); }
  get metrics(): FormArray { return this.progression?.get('metrics') as FormArray; }
  get location(): FormGroup { return this.progression?.get('location') as FormGroup; }
  get possibleSystems(): System[] {
    if (this.tribes?.length && this.selectedTribeIndex != null) {
      return this.tribes[this.selectedTribeIndex]?.systems;
    }
    if (this.tribes?.length && this.selectedTribeIndex == null) {
      return null;
    }

    return this.systems;
  }

  ngOnInit(): void {
    this.getTribes();
    this.initForm();
    this.updateFilteredProgressions();
    this.getSteps();
    this.updateFilteredHabitStacks();
  }

  ngOnDestroy(): void {
    if (this.sysSub) this.sysSub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.tribeSub) this.tribeSub.unsubscribe();
    if (this.stepSub) this.stepSub.unsubscribe();
  }

  public selectTribe(tribeIndex: number, event: any) {
    if (event.isUserInput)
      this.selectedTribeIndex = tribeIndex;
  }

  public selectSystem(systemIndex: number, system: System, event: any) {
    if (event.isUserInput) {
      this.selectedSystemIndex = systemIndex;
      this.systemSelected = system;
    }
  }

  public selectHabitStack(hs: HabitStack, event: any) {
    if (event.isUserInput) {
      this.selectedHabitStack = hs;
      if (!this.selectedHabitStack.progressions.some(prog => prog.justCreated == true)) {
        this.selectedHabitStack.progressions.push(new Progression(null, null, null, null, null, null, null, null, null, hs.progressions.length, null, null, null, null, true));
      }
      this.id.setValue(hs.id);
      this.weekdays.setValue(this.timeService.getWeekdaysWithRemainingDays(hs.weekdays));
    }
  }

  public selectIndependantHabitName(event: any) {
    if (event.isUserInput) {
      this.selectedHabitStack = null;
    }
  }

  public setHabitName(e: any): void {
    if (this.selectedHabitStack) {
      const progressionCreatedIndex = this.selectedHabitStack?.progressions?.findIndex(prog => prog.justCreated == true);
      if (progressionCreatedIndex == -1) {
        if (!this.isUpdatingExistingHabit) {
          this.selectedHabitStack.progressions.push(new Progression(null, null, null, null, null, null, null, null, null, this.selectedHabitStack.progressions.length, null, null, null, null, true));
        }
        this.isUpdatingExistingHabit = false;
      } else {
        let progressionsCopy = [...this.selectedHabitStack.progressions];
        progressionsCopy[progressionCreatedIndex] = { ...progressionsCopy[progressionCreatedIndex], habitName: e?.target?.value };
        this.selectedHabitStack.progressions = progressionsCopy;
      }
    }

    if (this.isIndependentHabitSelected()) {
      this.habitStackName.setValue(this.independantHabitNameTrans + ' - ' + e?.target?.value);
    }
    // console.log(this.selectedHabitStack)
  }

  public deleteJustCreatedProgression(progression: Progression, event: any) {
    if (event.isUserInput) {
      console.log("before delete", this.selectedHabitStack.progressions)
      this.selectedHabitStack.progressions.splice(this.selectedHabitStack.progressions.findIndex(prog => prog.justCreated == true), 1);
      console.log("after delete", this.selectedHabitStack.progressions)
      console.log(this.selectedHabitStack)

      this.isUpdatingExistingHabit = true;
      this.updateHabitInForm(progression);
    }
  }

  public submit(): void {
    let habitStackCreation = this.habitForm.value;
    habitStackCreation.weekdays = this.timeService.weekdaysWithActivityToWeekdays(habitStackCreation.weekdays);
    // console.log(this.selectedHabitStack)
    if (!this.selectedHabitStack) {
      this.executionOrder.setValue(0);
      habitStackCreation.progressions = new Array();
      let progression: Progression = this.progression.value;
      habitStackCreation.progressions.push(this.habitStackService.removeEmptyFields(progression));
    } else {
      habitStackCreation.progressions = this.selectedHSWithUpdatedCreatedProgression();
    }
    delete habitStackCreation.progression;
    // console.log(habitStackCreation)
    this.submitSub = this.habitStackService.createHabit(habitStackCreation).subscribe(_ => this.habitFormSubmitted.emit(true));
  }

  public drop(event: CdkDragDrop<Progression[]>) {
    moveItemInArray(this.selectedHabitStack?.progressions, event.previousIndex, event.currentIndex);
    this.selectedHabitStack.progressions = this.habitStackService.getReorderedProgressions(this.selectedHabitStack?.progressions);
  }

  public isIndependentHabitSelected(): boolean {
    return this.habitStackName?.value?.startsWith(this.independantHabitNameTrans);
  }

  private updateHabitInForm(progression: Progression): void {
    // console.log("before update", progression)
    this.habitSelected = progression;
    this.progression.patchValue({
      habitName: progression.habitName,
      gatewayHabit: progression.gatewayHabit,
      versionName: null,
      executionOrder: progression.executionOrder,
      habitId: progression.habitId,
    });
    this.location.patchValue(progression.location);
    this.conditioningStep.patchValue(progression.conditioningStep);
    this.preparationHabit.patchValue(progression.preparationHabit);
    this.reward.patchValue(progression.reward);
    // this.habitContract.patchValue(progression.habitContract);

    this.updateIdentitiesForm(progression.identities);
    this.updateMetricsForm(progression.metrics);
    // console.log("after update", this.progression.value)
  }

  private updateIdentitiesForm(identities: Identity[]): void {
    this.identities.reset();
    this.identities.setValue(identities);
  }

  private updateMetricsForm(metrics: Metric[]): void {
    this.metrics.clear();
    this.metrics.reset();
    metrics.forEach(metric => {
      this.metrics.push(this.createMetricForm(metric));
    });
  }

  private selectedHSWithUpdatedCreatedProgression(): Progression[] {
    // problem is here

    let createdProgression = this.progression.value;
    console.log(this.selectedHabitStack?.progressions)
    console.log("before", createdProgression.executionOrder, createdProgression)
    let order = this.selectedHabitStack?.progressions.find(progression => progression?.justCreated)?.executionOrder;

    order = order != undefined ? order : this.selectedHabitStack?.progressions.find(progression => progression?.habitId == createdProgression?.habitId)?.executionOrder;
    if (order != undefined) {
      createdProgression.executionOrder = order;
      this.selectedHabitStack.progressions[order] = this.habitStackService.removeEmptyFields(createdProgression);
    }

    console.log("after", createdProgression.executionOrder, createdProgression)

    return this.selectedHabitStack.progressions;
  }

  private updateFilteredHabitStacks(): void {
    this.filteredHabitStacks = this.habitStackName?.valueChanges.pipe(
      startWith(''),
      map(habitStackName => this.filterHabitStackName(habitStackName))
    );
  }

  private filterHabitStackName(habitName: string): HabitStack[] {
    const filterValue = habitName?.toLowerCase();

    return this.possibleSystems[this.selectedSystemIndex]?.habitStacks
      ?.filter(habitStack => habitStack?.habitStackName?.toLowerCase()?.includes(filterValue));
  }


  private updateFilteredProgressions(): void {
    this.filteredProgressions = this.habitName.valueChanges.pipe(
      startWith(''),
      map(habitName => this.filterHabitName(habitName))
    );
  }

  private filterHabitName(habitName: string): Progression[] {
    const filterValue = habitName.toLowerCase();

    return this.selectedHabitStack?.progressions
      .filter(progression => progression?.habitName?.toLowerCase()?.includes(filterValue));
  }

  private initForm(): void {
    this.habitForm = this.fb.group(
      {
        systemId: [null, [Validators.required]],
        habitStackName: [null, [Validators.required]],
        weekdays: this.timeService.createWeekdayArrayForm(),
        progression: this.createProgressionForm(),
        id: [null],
        tribeId: [null]
      }
    );
  }

  private createProgressionForm(): FormGroup {
    return this.fb.group({
      habitName: [null, [Validators.required]],
      gatewayHabit: [null, [Validators.required]],
      location: this.locationService.createLocationForm(),
      identities: new FormControl(null, [Validators.required]),
      preparationHabit: this.createStepForm(),
      conditioningStep: this.createStepForm(),
      reward: this.createStepForm(),
      // habitContract: this.createHabitContractForm(),
      versionName: [null, [Validators.required]],
      executionOrder: [null],
      metrics: this.fb.array([this.createMetricForm()]),
      habitId: [null],
    });
  }

  private createMetricForm(metric?: Metric): FormGroup {
    return this.fb.group({
      metricName: [metric ? metric.metricName : null],
      metricUnit: [metric ? metric.metricUnit : null],
      id: [metric ? metric.id : null],
      isPrincipal: [metric ? metric.isPrincipal : null],
    }, { validators: metricValidator });
  }

  private createStepForm(step?: Step): FormGroup {
    return this.fb.group({
      description: [step ? step.description : null],
      location: this.locationService.createLocationForm(step?.location),
      id: [step ? step.id : null],
    }, { validators: stepValidator });
  }

  // private createHabitContractForm(habitContract?: HabitContract): FormGroup {
  //   return this.fb.group({
  //     commitment: [habitContract ? habitContract.commitment : null, [Validators.required]],
  //     punishment: [habitContract ? habitContract.punishment : null, [Validators.required]],
  //     accountablePartnerId: [habitContract ? habitContract.accountablePartnerId : null, [Validators.required]],
  //     accountablePartnerName: [habitContract ? habitContract.accountablePartnerName : null, [Validators.required]],
  //   });
  // }

  private getSystems(): void {
    this.sysSub = this.systemService.currentSystems.length ?
      this.systemService.systems$.subscribe(s => this.systems = s) :
      this.systemService.getSystems().subscribe(s => this.systems = s);
  }

  private getTribes(): void {
    this.tribeSub = this.tribeService.getTribesByUser().subscribe(tribes => {
      if (tribes.length) {
        this.tribes = tribes;
      } else {
        this.getSystems();
      }
    });
  }

  private getSteps(): void {
    this.stepSub = this.stepService.getSteps().subscribe(steps => this.steps = steps);
  }

}
