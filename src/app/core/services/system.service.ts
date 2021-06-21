import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System } from '../../shared/models/system';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private systems: BehaviorSubject<System[]> = new BehaviorSubject([]);
  public readonly systems$: Observable<System[]> = this.systems.asObservable();

  constructor(private http: HttpClient) { }

  public getSystems(): Observable<System[]> {
    const url = `${environment.backend.baseURL}/members/systems`;

    return this.http.get<System[]>(url).pipe(
      tap(s => this.addSystems(s))
    );
  }

  public createSystem(system: System): Observable<System> {
    const url = `${environment.backend.baseURL}/members/systems`;

    return this.http.post<System>(url, system).pipe(
      tap(s => this.addSystem(s))
    );
  }

  public addSystem(system: System): void {
    let systems = this.systems.value;
    systems.push(system);
    this.systems.next(systems);
  }

  public addSystems(systems: System[]): void {
    let currentSystems = this.currentSystems;
    currentSystems.concat(systems);
    this.systems.next(currentSystems);
  }

  get currentSystems(): System[] { return this.systems.value; }

}
