import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const metricValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const metricName = control.get("metricName")?.value;
  const metricUnit = control.get("metricUnit")?.value;
  return metricName || !metricUnit
    ? null
    : { metricNameRequired: true };
};
