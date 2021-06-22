import { HabitStackCreation } from './../../shared/models/habit-stack';
import { Progression } from './../../shared/models/progression';
import { environment } from './../../../environments/environment';
import { HabitStackFeedbuzz } from '../../shared/models/habit-stack';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitStackService {

  private habitStacksFeedbuzz: BehaviorSubject<HabitStackFeedbuzz[] | null> = new BehaviorSubject([]);
  public readonly habitStacksFeedbuzz$: Observable<HabitStackFeedbuzz[] | null> = this.habitStacksFeedbuzz.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public getHabitStackFeedbuzz(): Observable<HabitStackFeedbuzz[]> {
    const url = `${environment.backend.baseURL}/habit-stack-feedbuzz`

    return this.http.get<HabitStackFeedbuzz[]>(url).pipe(
      map(hss => hss.map(hs => {
        hs.progressions.sort((a, b) => a.executionOrder - b.executionOrder);

        return hs;
      }))
    );
  }

  public createHabit(hs: HabitStackCreation): Observable<HabitStackCreation> {
    const url = `${environment.backend.baseURL}/members/habit-stacks/habits`

    return this.http.post<HabitStackCreation>(url, hs);
  }

  public setHabitStacksFeedbuzz(hs?: HabitStackFeedbuzz[]): void {
    if (hs) {
      this.habitStacksFeedbuzz.next(hs);
    } else {
      this.getHabitStackFeedbuzz().subscribe(
        feedbuzz => this.habitStacksFeedbuzz.next(feedbuzz)
      );
    }
  }

  public updateHabitStacksFeedbuzz(pictures: Picture[], habitIndex: number, repetitionIndex: number): void {
    const currentHSF = this.getCurrentHabitStacksFeedbuzz();
    currentHSF[habitIndex].progressions[repetitionIndex].repetition.publicationPictures = pictures;
    this.setHabitStacksFeedbuzz(currentHSF);
  }

  public getReorderedProgressions(progressions: Progression[]): Progression[] {
    progressions.forEach((progression, index) => progression.executionOrder = index);
    return progressions;
  }

  public removeEmptyFields(progression: Progression): Progression {
    progression.metrics = progression.metrics.filter(m => !!m.metricName);
    if (!progression?.conditioningStep?.description) {
      progression.conditioningStep = null;
    } else {
      if (!progression?.conditioningStep?.location?.name) {
        progression.conditioningStep.location = null;
      }
    }

    if (!progression?.preparationHabit?.description) {
      progression.preparationHabit = null;
    } else {
      if (!progression?.preparationHabit?.location?.name) {
        progression.preparationHabit.location = null;
      }
    }

    if (!progression?.reward?.description) {
      progression.reward = null;
    } else {
      if (!progression?.reward?.location?.name) {
        progression.reward.location = null;
      }
    }
    progression.progressionId = null;

    return progression;
  }

  public getCurrentHabitStacksFeedbuzz(): HabitStackFeedbuzz[] {
    return this.habitStacksFeedbuzz.value;
  }
}
