import { LayoutService } from './../../../core/services/layout.service';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Picture } from './../../../shared/models/picture';
import { UploadDialogComponent } from './../upload-dialog/upload-dialog.component';
import { ProfilePicturesService } from './../../../core/services/profile-pictures.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-pictures-upload',
  templateUrl: './pictures-upload.component.html',
  styleUrls: ['./pictures-upload.component.scss']
})
export class PicturesUploadComponent implements OnInit {

  @Input() profileId: string;
  @Input() profilePicture: Picture;
  public picturesForm: FormGroup;
  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];
  private langSub: Subscription;
  public isLargerScreen: boolean;
  private screenSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private profilePicturesService: ProfilePicturesService,
    public dialog: MatDialog,
    private translationService: TranslationService,
    private translate: TranslateService,
    private layoutService: LayoutService
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }

  ngOnInit(): void {
    this.initForm();
    this.updateLang();
    this.getLargerScreen();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
    this.screenSub.unsubscribe();
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.profilePicturesService.setPicturesForm(this.picturesForm);
    dialogConfig.data = { profileId: this.profileId, profilePicture: this.profilePicture };
    if (this.isLargerScreen) {
      dialogConfig.minWidth = 600;
      dialogConfig.width = '60vw';
    } else {
      dialogConfig.maxWidth = '95vw';
      dialogConfig.width = '95vw';
    }
    const dialogRef = this.dialog.open(UploadDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => { });
  }

  private initForm(): void {
    this.picturesForm = this.fb.group({
      pictures: [undefined, [
        Validators.required,
        FileValidator.maxContentSize(this.maxSize)
      ]],
      headlineIndex: [null, []]
    });
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

  private getLargerScreen(): void {
    this.screenSub = this.layoutService.onLargerScreen$
      .subscribe(isLargerScreen => this.isLargerScreen = isLargerScreen);
  }

}
