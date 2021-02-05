import { ValidatorFn, ValidationErrors, AbstractControl, FormArray } from '@angular/forms';

export const repetitionValidator: ValidatorFn = (
  repetition: AbstractControl
): ValidationErrors | null => {
  const repetitionStatus = repetition.get('repetitionStatus').value;

  if (!repetitionStatus) {
    return null;
  }

  const metricValues = repetition.get('metricValues') as FormArray;

  for (let index = 0; index < metricValues.length; index++) {
    const metricValue = metricValues.at(index);

    if (!metricValue.value.value) {
      return { missingMetricValue: true };
    }
  }

  return null;
};
