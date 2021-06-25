import { LayoutService } from './../../../core/services/layout.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {

  @Input() opened: boolean;
  @Input() message: string;
  @Output() action = new EventEmitter<null>();
  public closed = false;
  private widthSub: Subscription;
  public onLargerScreen: boolean;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.getWidth();
  }

  ngOnDestroy(): void {
    this.widthSub.unsubscribe();
  }

  public sendAction(): void {
    this.action.emit(null);
    this.closeBanner();
  }

  public closeBanner(): void {
    this.closed = true;
  }

  private getWidth(): void {
    this.widthSub = this.layoutService.innerWidth$.subscribe(
      width => {
        this.onLargerScreen = width > 950;
      }
    );
  }

}
