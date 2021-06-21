import { weekdayValidator } from './../validators/weekday-validator';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Day, Weekday, WeekdayWithActivity } from './../models/habit-stack';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public DAYS = [
    new Day('MONDAY', 'Monday', 'Lundi'),
    new Day('TUESDAY', 'Tuesday', 'Mardi'),
    new Day('WEDNESDAY', 'Wednesday', 'Mercredi'),
    new Day('THURSDAY', 'Thursday', 'Jeudi'),
    new Day('FRIDAY', 'Friday', 'Vendredi'),
    new Day('SATURDAY', 'Saturday', 'Samedi'),
    new Day('SUNDAY', 'Sunday', 'Dimanche'),
  ];

  constructor(private fb: FormBuilder) { }

  public createTimeFromString(time: string): Date {
    if (moment(time, 'h:mm A').isValid()) {
      return moment(time, ["h:mm A"]).toDate();
    }
    if (moment(time, 'hh:mm').isValid()) {
      return moment(time, ["hh:mm"]).toDate();
    }
  }

  public getWeekdaysWithRemainingDays(weekdays: Weekday[]): WeekdayWithActivity[] {
    let weekdaysCopy = weekdays.slice();
    let weekdaysWithRemainingDays = [];
    this.DAYS.forEach(day => {
      let weekdayIndex = weekdaysCopy.findIndex(wd => wd.weekday.label == day.label);
      if (weekdayIndex != -1) {
        weekdaysWithRemainingDays.push(new WeekdayWithActivity(weekdaysCopy[weekdayIndex], true));
        weekdaysCopy.splice(weekdayIndex, 1);
      } else {
        weekdaysWithRemainingDays.push(new WeekdayWithActivity(new Weekday(day, null), false));
      }
    });

    return weekdaysWithRemainingDays;
  }

  public weekdaysWithActivityToWeekdays(weekdays: WeekdayWithActivity[]): Weekday[] {
    return weekdays.filter(wd => wd.isActive).map(wd => {
      const time = wd.time;
      return new Weekday(wd.weekday, String(time).length > 8 ? time : this.createTimeFromString(String(time)));
    });
  }

  public createWeekdayArrayForm(): FormArray {
    return this.fb.array(this.DAYS
      .map(day => new WeekdayWithActivity(new Weekday(day, null), false))
      .map(weekday => this.createWeekdayForm(weekday)), [Validators.required]
    );
  }

  private createWeekdayForm(weekday?: WeekdayWithActivity): FormGroup {
    return this.fb.group({
      weekday: [weekday ? weekday.weekday : null],
      time: [weekday ? weekday.time : null],
      isActive: [weekday ? weekday.isActive : null],
    }, { validators: weekdayValidator });
  }

}
