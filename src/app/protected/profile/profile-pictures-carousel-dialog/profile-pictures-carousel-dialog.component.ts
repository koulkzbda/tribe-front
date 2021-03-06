import { PictureDisplayingService } from './../../../shared/utils/picture-displaying.service';
import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProfilePicturesService } from '../../../core/services/profile-pictures.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Picture, Pictures } from '../../../shared/models/picture';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-profile-pictures-carousel',
  templateUrl: './profile-pictures-carousel-dialog.component.html',
  styleUrls: ['./profile-pictures-carousel-dialog.component.scss']
})
export class ProfilePicturesCarouselDialogComponent implements OnInit, OnDestroy {

  public imgs: Picture[] = [];
  private pictureSub: Subscription;
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: false,
    breakpoints: {
      300: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };
  private langSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pictures,
    private profilePicturesService: ProfilePicturesService,
    public pictureDisplayingService: PictureDisplayingService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initImgs();
    this.updateLang();
  }

  ngOnDestroy(): void {
    if (this.pictureSub) {
      this.pictureSub.unsubscribe();
    }
    this.langSub.unsubscribe();
  }

  public setProfilePicture(picture: Picture): void {
    this.pictureSub = this.profilePicturesService.setProfilePicture(picture).subscribe();
  }

  public deleteProfilePicture(picture: Picture, index: number): void {
    this.usefulSwiper.swiper.removeSlide(index);
    this.pictureSub = this.profilePicturesService.deleteProfilePicture(picture)
      .subscribe();
  }

  private initImgs(): void {
    this.imgs.push(this.data.headlinePicture);
    this.imgs.push(...this.data.otherPictures);
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
