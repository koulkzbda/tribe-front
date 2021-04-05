import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { HabitStackService } from './../../../core/services/habit-stack.service';
import { PublicationPicturesService } from './../../../core/services/publication-pictures.service';
import { PictureDisplayingService } from './../../../core/services/picture-displaying.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-publication-pictures-upload-dialog',
  templateUrl: './publication-pictures-upload-dialog.component.html',
  styleUrls: ['./publication-pictures-upload-dialog.component.scss']
})
export class PublicationPicturesUploadDialogComponent implements OnInit, OnDestroy {

  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];
  public imgNames = [];
  public picturesForm: FormGroup;
  private formSub: Subscription;
  private langSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private publicationPicturesService: PublicationPicturesService,
    public pictureDisplayingService: PictureDisplayingService,
    private habitStackService: HabitStackService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }
  get headlineIndex(): AbstractControl { return this.picturesForm.get('headlineIndex'); }

  ngOnInit(): void {
    this.getForm();
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
    this.langSub.unsubscribe();
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
    console.log(pictures)
    const pictureUrlInfo = this.pictureDisplayingService.detectFiles(pictures);
    this.imgNames = pictureUrlInfo.imgNames;
    this.imgURLs = pictureUrlInfo.imgURLs;
  }

  public setAsHeadlinePicture(index: number): void {
    this.picturesForm.patchValue(
      { headlineIndex: index }
    );
  }

  private getForm(): void {
    this.formSub = this.publicationPicturesService.picturesForm$
      .subscribe(pictures => {
        this.picturesForm = pictures;
        this.updateImgURL(this.pictures.value.files);
      }
      );
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
