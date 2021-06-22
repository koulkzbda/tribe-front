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

  public conditioningStepHint = "A conditioning habit is something you're used to do, see, feel just before your habit. A cue that triggers your process.";
  public identitiesHint = "Everytime you achieve this habit it's a vote for these identities you want to become.";
  public preparationHabitHint = "A preparation habit is a task you accomplish after your habit to prepare your next repetition of this habit.";

  constructor() { }

  get conditioningStep(): FormGroup { return this.progression?.get('conditioningStep') as FormGroup; }
  get reward(): FormGroup { return this.progression?.get('reward') as FormGroup; }
  get preparationHabit(): FormGroup { return this.progression?.get('preparationHabit') as FormGroup; }
  get identities(): AbstractControl { return this.progression?.get('identities') as AbstractControl; }

  ngOnInit(): void {
  }


}
