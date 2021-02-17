import { HabitStackService } from './../../../core/services/habit-stack.service';
import { PublicationPicturesService } from '../../../core/services/publication-pictures.service';
import { PictureDisplayingService } from '../../../core/services/picture-displaying.service';
import { SwiperComponent } from 'ngx-useful-swiper';
import { Subscription } from 'rxjs';
import { Picture, Pictures } from 'src/app/shared/models/picture';
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-publication-carousel',
  templateUrl: './publication-carousel.component.html',
  styleUrls: ['./publication-carousel.component.scss']
})
export class PublicationCarouselComponent implements OnInit, OnDestroy {

  //  For repetition only
  @Input() habitIndex: number;
  @Input() repetitionIndex: number;

  @Input() publicationId: string;
  @Input() isRepetitionType = false;
  @Input() pictures: Pictures
  public imgs: Picture[] = [];
  private pictureSub: Subscription;
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  };

  constructor(
    private publicationPicturesService: PublicationPicturesService,
    public pictureDisplayingService: PictureDisplayingService,
    private habitStackService: HabitStackService
  ) { }

  ngOnInit(): void {
    this.initImgs();
  }

  ngOnDestroy(): void {
    if (this.pictureSub) {
      this.pictureSub.unsubscribe();
    }
  }

  public setPincipalPicture(picture: Picture): void {
    this.pictureSub = this.publicationPicturesService.setHeadlinePicture(picture, this.publicationId, this.isRepetitionType).subscribe(
      pictures => {
        if (this.habitIndex != null && this.repetitionIndex != null && this.isRepetitionType) {
          this.habitStackService.updateHabitStacksFeedbuzz(pictures, this.habitIndex, this.repetitionIndex);
        }
      }
    );
  }

  public deletePicture(picture: Picture, index: number): void {
    this.usefulSwiper.swiper.removeSlide(index);
    this.pictureSub = this.publicationPicturesService.deletePicture(picture, this.publicationId, this.isRepetitionType)
      .subscribe(
        pictures => {
          if (this.habitIndex && this.repetitionIndex && this.isRepetitionType) {
            this.habitStackService.updateHabitStacksFeedbuzz(pictures, this.habitIndex, this.repetitionIndex);
          }
        }
      );
  }

  private initImgs(): void {
    this.imgs.push(this.pictures.headlinePicture);
    this.imgs.push(...this.pictures.otherPictures);
  }

}
