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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profilePicturesService: ProfilePicturesService,
    public pictureDisplayingService: PictureDisplayingService
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }
  get headlineIndex(): AbstractControl { return this.picturesForm.get('headlineIndex'); }

  ngOnInit(): void {
    this.formSub = this.profilePicturesService.picturesForm$
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
    console.log(this.headlineIndex.value);

    this.profilePicturesService.addProfilePictures(
      this.pictures.value.files,
      this.data.profileId,
      this.headlineIndex.value ? this.imgNames[this.headlineIndex.value] : null)
      .subscribe(_ => console.log('ok'));
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

}
