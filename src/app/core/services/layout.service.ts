import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private sidenavOpened: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly sidenavOpened$: Observable<boolean> = this.sidenavOpened.asObservable();

  constructor() { }

  public toggleSidenav(): void {
    this.sidenavOpened.next(!this.sidenavOpened.value);
  }

}
