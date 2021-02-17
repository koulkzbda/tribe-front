import { ValidatorFn, ValidationErrors, AbstractControl, FormArray } from '@angular/forms';

export const repetitionValidator: ValidatorFn = (
  repetition: AbstractControl
): ValidationErrors | null => {
  const repetitionStatus = repetition.get('repetitionStatus').value;
  const metricValues = repetition.get('metricValues') as FormArray;
  const numericalPattern = /^[0-9 ]+[,.]?[0-9]+$|^[0-9]+$/;

  if (!repetitionStatus) {
    if (metricValues) {
      for (let index = 0; index < metricValues.length; index++) {
        const metricValueValue = metricValues.at(index).get('value');
        if (metricValueValue.value) {
          if (!numericalPattern.test(metricValueValue.value)) {
            metricValueValue.setErrors({ notNumerical: true });

            return { notNumerical: true };
          }
        } else {
          metricValueValue.setErrors(null);
        }
      }
    }

    return null;
  }

  if (metricValues) {
    for (let index = 0; index < metricValues.length; index++) {
      const metricValue = metricValues.at(index);

      if (!metricValue.value.value) {
        metricValue.get('value').setErrors({ required: true });

        return { missingMetricValue: true };
      }

      if (!numericalPattern.test(metricValue.value.value)) {
        metricValue.get('value').setErrors({ notNumerical: true });

        return { notNumerical: true };
      }
    }
  }

  return null;
};
