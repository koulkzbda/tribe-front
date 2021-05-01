import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password1 = control.get("password")?.value || control.get("password1")?.value;
  const password2 = control.get("passwordConfirm")?.value || control.get("password2")?.value;
  return password1 && password2 && password1 === password2
    ? null
    : { passwordsNotEqual: true };
};
