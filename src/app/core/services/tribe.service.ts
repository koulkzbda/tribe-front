import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tribe } from './../../shared/models/tribe';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TribeService {

  private tribes: BehaviorSubject<Tribe[] | null> = new BehaviorSubject(null);
  public readonly tribes$: Observable<Tribe[] | null> = this.tribes.asObservable();

  constructor(private http: HttpClient) { }

  public getTribesByUser(): Observable<Tribe[]> {
    const url = `${environment.backend.baseURL}/tribes/members`;

    return this.http.get<Tribe[]>(url).pipe(
      tap(tribes => this.setTribes(tribes))
    );
  }

  public setTribes(tribes: Tribe[]): void {
    this.tribes.next(tribes);
  }
}
