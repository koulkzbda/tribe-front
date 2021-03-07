import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { PictureDisplayingService } from './../../../core/services/picture-displaying.service';
import { Subscription } from 'rxjs';
import { ProfilePicturesService } from './../../../core/services/profile-pictures.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];
  public imgNames = [];
  public picturesForm: FormGroup;
  private formSub: Subscription;
  private langSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profilePicturesService: ProfilePicturesService,
    public pictureDisplayingService: PictureDisplayingService,
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

  public savePictures(): void {
    this.profilePicturesService.addProfilePictures(
      this.pictures.value.files,
      this.data.profileId,
      this.headlineIndex.value ? this.imgNames[this.headlineIndex.value] : null)
      .subscribe();
  }

  public updateImgURL(pictures: File[]): void {
    const pictureUrlInfo = this.pictureDisplayingService.detectFiles(pictures);
    this.imgNames = pictureUrlInfo.imgNames;
    this.imgURLs = pictureUrlInfo.imgURLs;
  }

  public setAsProfilePicture(index: number): void {
    this.picturesForm.patchValue(
      { headlineIndex: index }
    );
  }

  private getForm(): void {
    this.formSub = this.profilePicturesService.picturesForm$
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
