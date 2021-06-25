import { GoToNextStep } from './../../../../shared/models/utils/go-to-next-step';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-define-identity',
  templateUrl: './define-identity.component.html',
  styleUrls: ['./define-identity.component.scss']
})
export class DefineIdentityComponent implements OnInit {

  @Input() stepIndex: number;
  @Output() goToNextStep = new EventEmitter<GoToNextStep>();

  public identityCategories: string[];


  constructor(
  ) { }

  ngOnInit(): void {
  }

  public onIsFormSubmitted(isStepValid: boolean): void {
    this.goToNextStep.emit(new GoToNextStep(this.stepIndex, isStepValid));
  }

  public onIsFormValid(isValid: boolean): void {
    if (!isValid) this.goToNextStep.emit(new GoToNextStep(this.stepIndex, isValid));
  }

}
