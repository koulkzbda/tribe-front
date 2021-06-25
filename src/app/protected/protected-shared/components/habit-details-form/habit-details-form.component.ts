import { Observable } from 'rxjs';
import { Identity } from './../../../../shared/models/identity';
import { Step } from './../../../../shared/models/step';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-habit-details-form',
  templateUrl: './habit-details-form.component.html',
  styleUrls: ['./habit-details-form.component.scss']
})
export class HabitDetailsFormComponent implements OnInit {

  @Input() progression: FormGroup;
  @Input() steps: Step[];
  @Input() identitiesPossible: Identity[];
  @Input() initialSelectedIdentities: Identity[];

  public filteredConditionings: Observable<Step[]>;

  constructor() { }

  get conditioningStep(): FormGroup { return this.progression?.get('conditioningStep') as FormGroup; }
  get reward(): FormGroup { return this.progression?.get('reward') as FormGroup; }
  get preparationHabit(): FormGroup { return this.progression?.get('preparationHabit') as FormGroup; }
  get identities(): AbstractControl { return this.progression?.get('identities') as AbstractControl; }

  ngOnInit(): void {
  }


}
