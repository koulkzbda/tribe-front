import { LayoutService } from './../core/services/layout.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit, OnDestroy {

  public opened: boolean;
  private openedSub: Subscription;
  public isLargerScreen$: Observable<boolean>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.openedSub =
      this.layoutService.sidenavOpened$.subscribe(
        isSidenavOpened => this.opened = isSidenavOpened
      );
    this.isLargerScreen$ = this.layoutService.onLargerScreen$;
  }

  ngOnDestroy(): void {
    this.openedSub.unsubscribe();
  }

}
