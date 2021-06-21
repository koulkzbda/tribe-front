import { TranslationService } from './../../../../core/services/translation.service';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weekdays-form',
  templateUrl: './weekdays-form.component.html',
  styleUrls: ['./weekdays-form.component.scss']
})
export class WeekdaysFormComponent {

  @Input() habitForm: FormGroup;
  @Input() weekdays: FormArray;

  public weekday(weekdayIndex: number): FormGroup {
    return this.weekdays?.at(weekdayIndex) as FormGroup
  }

  public day(weekdayIndex: number): string {
    const day = this.weekday(weekdayIndex)?.get('weekday')?.value;
    return day ? day[this.translationService.getCurrentLang()] : null;
  }

  public time(weekdayIndex: number): AbstractControl {
    return this.weekday(weekdayIndex)?.get('time');
  }
  public isActive(weekdayIndex: number): AbstractControl {
    return this.weekday(weekdayIndex)?.get('isActive');
  }

  constructor(
    private translationService: TranslationService
  ) { }

  public updateValid(weekdayIndex: number): void {
    if (this.weekday(weekdayIndex).hasError('timeRequired'))
      this.time(weekdayIndex).setErrors([{ 'timeRequired': true }]);
    else
      this.time(weekdayIndex).setErrors(null);
  }

  public touchTime(weekdayIndex: number): void {
    this.time(weekdayIndex).markAsTouched();
  }

}
