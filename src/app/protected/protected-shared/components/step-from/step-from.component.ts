import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Step } from './../../../../shared/models/step';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-from',
  templateUrl: './step-from.component.html',
  styleUrls: ['./step-from.component.scss']
})
export class StepFromComponent implements OnInit {

  @Input() step: FormGroup;
  @Input() possibleSteps: Step[];
  @Input() formGroupName: string;
  @Input() iconName: string;
  @Input() label: string;
  @Input() hint: string;

  public filteredSteps: Observable<Step[]>;

  constructor() { }

  get stepDescription(): AbstractControl { return this.step?.get('description') as AbstractControl; }
  get stepLocation(): FormGroup { return this.step?.get('location') as FormGroup; }

  ngOnInit(): void {
    this.updateFilteredSteps();
  }

  public updateStep(step: Step) {
    this.step.patchValue({
      id: step.id,
    });
    this.stepLocation.patchValue(step.location);
  }

  public onDescriptionInput(): void {
    if (this.step.hasError('descriptionRequired'))
      this.stepDescription.setErrors([{ 'descriptionRequired': true }]);
    else
      this.stepDescription.setErrors(null);
  }

  private updateFilteredSteps(): void {
    this.filteredSteps = this.stepDescription.valueChanges.pipe(
      startWith(''),
      map(description => this.filterDescription(description))
    );
  }

  private filterDescription(description: string): Step[] {
    const filterValue = description?.toLowerCase();

    return this.possibleSteps?.filter(step => step?.description?.toLowerCase()?.includes(filterValue));
  }

}
