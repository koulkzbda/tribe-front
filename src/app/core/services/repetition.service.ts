import { HabitStackService } from './habit-stack.service';
import { Repetition, RepetitionFeedbuzzUpdate } from './../../shared/models/repetition';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepetitionService {

  constructor(
    private http: HttpClient,
    private habitStackService: HabitStackService
  ) { }

  public updateRepetition(repetition: RepetitionFeedbuzzUpdate, habitIndex: number, repetitionIndex: number): Observable<RepetitionFeedbuzzUpdate> {
    const url = `${environment.backend.baseURL}/habit-stack-feedbuzz/repetition`;
    if (repetition.content) {
      repetition.content = repetition.content.trim();
    }

    return this.http.patch<RepetitionFeedbuzzUpdate>(url, repetition).pipe(
      tap(rep => {
        const currentHSF = this.habitStackService.getCurrentHabitStacksFeedbuzz();
        currentHSF[habitIndex].progressions[repetitionIndex].repetition = this.transformRepetition(currentHSF[habitIndex].progressions[repetitionIndex].repetition, rep);
        this.habitStackService.setHabitStacksFeedbuzz(currentHSF);
      })
    );
  }

  private transformRepetition(repetition: Repetition, repetitionUpdate: RepetitionFeedbuzzUpdate): Repetition {
    repetition.content = repetitionUpdate.content;
    repetition.repetitionStatus = repetitionUpdate.repetitionStatus;
    for (let index = 0; index < repetition.metrics.length; index++) {
      repetition.metrics[index].value = repetitionUpdate.metricValues[index].value;
    }

    return repetition;
  }
}
