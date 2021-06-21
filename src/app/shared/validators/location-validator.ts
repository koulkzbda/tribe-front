import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const locationValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const name = control.get("name")?.value;
  const address = control.get("address")?.value;
  return name || !address
    ? null
    : { nameRequired: true };
};
