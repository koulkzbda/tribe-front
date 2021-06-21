import { environment } from './../../../environments/environment';
import { Step } from './../../shared/models/step';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private steps: BehaviorSubject<Step[]> = new BehaviorSubject(null);
  public readonly steps$: Observable<Step[]> = this.steps.asObservable();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  public getSteps(): Observable<Step[]> {
    const url = `${environment.backend.baseURL}/members/steps`;

    return this.http.get<Step[]>(url);
  }
}
