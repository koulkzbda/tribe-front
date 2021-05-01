import { Router } from '@angular/router';
import { LayoutService } from './../../core/services/layout.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isPortraitOrientation: boolean;
  private orientationSub: Subscription;
  public isLargerScreen: boolean;
  private screenSub: Subscription;
  public assetPath = environment.assetsPath;
  public cloudOffset: number;
  private widthSub: Subscription;
  public innerWidth: number;
  private heightSub: Subscription;
  public innerHeight: number;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLargerScreen();
    this.getOrientationScreen();
    this.updateOffsets();
  }

  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
    this.orientationSub.unsubscribe();
    this.widthSub.unsubscribe();
    this.heightSub.unsubscribe();
  }

  public goToRegister(): void {
    this.router.navigate(['register']);
  }

  private updateOffsets(): void {
    this.widthSub = this.layoutService.innerWidth$.subscribe(
      width => {
        this.innerWidth = width;
        this.cloudOffset = this.calculateCloudOffset();
      }
    );
    this.heightSub = this.layoutService.innerHeight$.subscribe(
      height => {
        this.innerHeight = height;
        this.cloudOffset = this.calculateCloudOffset();
      }
    )
  }

  private calculateCloudOffset(): number {
    const width = this.innerWidth;
    const height = this.innerHeight;
    if (width <= 840 && width >= 650 && height <= 650 && height) {
      return Math.round(36 + (600 - height) / 50);
    }

    return Math.round(37 + (width - height) / 50);
  }

  private getLargerScreen(): void {
    this.screenSub = this.layoutService.onLargerScreen$
      .subscribe(isLargerScreen => this.isLargerScreen = isLargerScreen);
  }

  private getOrientationScreen(): void {
    this.orientationSub = this.layoutService.isPortraitOrientation$
      .subscribe(isPortraitOrientation => this.isPortraitOrientation = isPortraitOrientation);
  }

}
