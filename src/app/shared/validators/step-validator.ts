import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const stepValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const description = control.get("description")?.value;
  const location = control.get("location");
  const name = location.get("name")?.value;
  const address = location.get("address")?.value;
  return description || (!name && !address)
    ? null
    : { descriptionRequired: true };
};
