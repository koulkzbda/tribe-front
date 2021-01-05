import { Subscription } from 'rxjs';
import { ProfilePicturesService } from './../../../core/services/profile-pictures.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PictureDisplayingService } from './../../../core/services/picture-displaying.service';
import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

// export interface Pictures {
//   headlinePicture?: Picture,
//   otherPictures: Picture[]
// }

@Component({
  selector: 'app-profile-pictures-carousel-dialog',
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profilePicturesService: ProfilePicturesService,
    public pictureDisplayingService: PictureDisplayingService
  ) { }

  ngOnInit(): void {
    this.initImgs();
  }

  ngOnDestroy(): void {
    if (this.pictureSub) {
      this.pictureSub.unsubscribe();
    }
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

}
