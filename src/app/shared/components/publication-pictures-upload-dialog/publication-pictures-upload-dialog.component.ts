import { HabitStackService } from './../../../core/services/habit-stack.service';
import { PublicationPicturesService } from './../../../core/services/publication-pictures.service';
import { PictureDisplayingService } from './../../../core/services/picture-displaying.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-publication-pictures-upload-dialog',
  templateUrl: './publication-pictures-upload-dialog.component.html',
  styleUrls: ['./publication-pictures-upload-dialog.component.scss']
})
export class PublicationPicturesUploadDialogComponent implements OnInit {

  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];
  public imgNames = [];
  public picturesForm: FormGroup;
  private formSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private publicationPicturesService: PublicationPicturesService,
    public pictureDisplayingService: PictureDisplayingService,
    private habitStackService: HabitStackService
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }
  get headlineIndex(): AbstractControl { return this.picturesForm.get('headlineIndex'); }

  ngOnInit(): void {
    this.formSub = this.publicationPicturesService.picturesForm$
      .subscribe(pictures => {
        this.picturesForm = pictures;
        this.updateImgURL(this.pictures.value.files);
      }
      );
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  savePictures(): void {
    this.publicationPicturesService.addPublicationPictures(
      this.pictures.value.files,
      this.data.publicationId,
      this.headlineIndex.value ? this.imgNames[this.headlineIndex.value] : null,
      this.data.isRepetitionType
    )
      .subscribe(
        pictures => {
          if (this.data.habitIndex != null && this.data.repetitionIndex != null && this.data.isRepetitionType) {
            this.habitStackService.updateHabitStacksFeedbuzz(pictures, this.data.habitIndex, this.data.repetitionIndex);
          }
        }
      );
  }

  public updateImgURL(pictures: File[]): void {
    const pictureUrlInfo = this.pictureDisplayingService.detectFiles(pictures);
    this.imgNames = pictureUrlInfo.imgNames;
    this.imgURLs = pictureUrlInfo.imgURLs;
  }

  public setAsHeadlinePicture(index: number): void {
    this.picturesForm.patchValue(
      { headlineIndex: index }
    );
  }

}
