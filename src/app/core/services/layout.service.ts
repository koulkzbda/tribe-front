import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public widthBreakpoint = 840;
  private onLargerScreen: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly onLargerScreen$: Observable<boolean> = this.onLargerScreen.asObservable();
  private isPortraitOrientation: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly isPortraitOrientation$: Observable<boolean> = this.isPortraitOrientation.asObservable();
  private sidenavOpened: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly sidenavOpened$: Observable<boolean> = this.sidenavOpened.asObservable();
  private innerWidth: BehaviorSubject<number> = new BehaviorSubject(null);
  public readonly innerWidth$: Observable<number> = this.innerWidth.asObservable();
  private innerHeight: BehaviorSubject<number> = new BehaviorSubject(null);
  public readonly innerHeight$: Observable<number> = this.innerHeight.asObservable();

  constructor() {
    this.innerHeight.next(window.innerHeight);
    this.innerWidth.next(window.innerWidth);
    this.isPortraitOrientation.next(this.isPortraitMode());
    this.onLargerScreen.next(this.isScreenLarger());
    window.onresize = () => {
      this.onLargerScreen.next(this.isScreenLarger());
      this.isPortraitOrientation.next(this.isPortraitMode());
      this.innerWidth.next(window.innerWidth);
      this.innerHeight.next(window.innerHeight);
    }
  }

  public toggleSidenav(): void {
    this.sidenavOpened.next(!this.sidenavOpened.value);
  }

  private isScreenLarger(): boolean {
    return window.innerWidth >= this.widthBreakpoint;
  }

  private isPortraitMode(): boolean {
    return window.innerWidth < window.innerHeight;
  }

}
