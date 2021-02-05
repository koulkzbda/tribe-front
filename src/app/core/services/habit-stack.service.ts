import { environment } from './../../../environments/environment';
import { HabitStackFeedbuzz } from './../../shared/models/habit-stack-feedbuzz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitStackService {

  constructor(
    private http: HttpClient
  ) { }

  public getHabitStackFeedbuzz(): Observable<HabitStackFeedbuzz[]> {
    const url = `${environment.backend.baseURL}/habit-stack`

    return this.http.get<HabitStackFeedbuzz[]>(url);
  }
}
