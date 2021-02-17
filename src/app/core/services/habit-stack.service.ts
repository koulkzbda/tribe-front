import { environment } from './../../../environments/environment';
import { HabitStackFeedbuzz } from './../../shared/models/habit-stack-feedbuzz';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';

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

    return this.http.get<HabitStackFeedbuzz[]>(url);
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

  public getCurrentHabitStacksFeedbuzz(): HabitStackFeedbuzz[] {
    return this.habitStacksFeedbuzz.value;
  }
}
