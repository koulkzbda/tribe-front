import { BooleanInput } from '@angular/cdk/coercion';
import { CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { matStepperAnimations, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-no-click-propagation-horizontal-stepper',
  exportAs: 'noClickPropagationHorizontalStepper',
  templateUrl: './no-click-propagation-horizontal-stepper.component.html',
  styleUrls: ['./no-click-propagation-horizontal-stepper.component.scss'],
  inputs: ['selectedIndex'],
  host: {
    'class': 'mat-stepper-horizontal',
    '[class.mat-stepper-label-position-end]': 'labelPosition == "end"',
    '[class.mat-stepper-label-position-bottom]': 'labelPosition == "bottom"',
    'aria-orientation': 'horizontal',
    'role': 'tablist',
  },
  animations: [matStepperAnimations.horizontalStepTransition],
  providers: [
    { provide: MatStepper, useExisting: NoClickPropagationHorizontalStepperComponent },
    { provide: CdkStepper, useExisting: NoClickPropagationHorizontalStepperComponent }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClickPropagationHorizontalStepperComponent extends MatStepper {

  @Input()
  labelPosition: 'bottom' | 'end' = 'end';

  static ngAcceptInputType_editable: BooleanInput;
  static ngAcceptInputType_optional: BooleanInput;
  static ngAcceptInputType_completed: BooleanInput;
  static ngAcceptInputType_hasError: BooleanInput;

}
