import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const weekdayValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const time = control.get("time")?.value;
  const isActive = control.get("isActive")?.value;
  return time || !isActive
    ? null
    : { timeRequired: true };
};
