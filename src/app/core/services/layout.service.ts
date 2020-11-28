import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public widthBreakpoint = 840;
  private onLargerScreen: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly onLargerScreen$: Observable<boolean> = this.onLargerScreen.asObservable();
  private sidenavOpened: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly sidenavOpened$: Observable<boolean> = this.sidenavOpened.asObservable();

  constructor() {
    this.onLargerScreen.next(this.isScreenLarger());
    window.onresize = () => {
      this.onLargerScreen.next(this.isScreenLarger());
    }
  }

  public toggleSidenav(): void {
    this.sidenavOpened.next(!this.sidenavOpened.value);
  }

  private isScreenLarger(): boolean {
    return window.innerWidth >= this.widthBreakpoint;
  }

}
