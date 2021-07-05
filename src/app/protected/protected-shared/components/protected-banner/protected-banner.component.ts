import { BannerContentService } from './../../../../core/services/banner-content.service';
import { BannerContent } from './../../../../shared/models/utils/banner-content';
import { LayoutService } from './../../../../core/services/layout.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-protected-banner',
  templateUrl: './protected-banner.component.html',
  styleUrls: ['./protected-banner.component.scss']
})
export class ProtectedBannerComponent implements OnInit {

  public content: BannerContent;
  private widthSub: Subscription;
  private contentSub: Subscription;
  public onLargerScreen: boolean;

  constructor(
    private layoutService: LayoutService,
    private bannerContentService: BannerContentService
  ) { }

  ngOnInit(): void {
    this.getWidth();
    this.getContent();
  }

  ngOnDestroy(): void {
    this.widthSub.unsubscribe();
    this.contentSub.unsubscribe();
  }

  public sendAction(): void {
    this.bannerContentService.performAction(this.content);
    this.closeBanner();
  }

  public closeBanner(): void {
    this.content.closed = true;
  }

  private getWidth(): void {
    this.widthSub = this.layoutService.innerWidth$.subscribe(
      width => {
        this.onLargerScreen = width > 950;
      }
    );
  }

  private getContent(): void {
    this.contentSub = this.bannerContentService.content$.subscribe(
      content => this.content = content
    );
  }

}
