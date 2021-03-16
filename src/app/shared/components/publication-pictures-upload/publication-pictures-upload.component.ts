import { LayoutService } from './../../../core/services/layout.service';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { PublicationPicturesUploadDialogComponent } from './../publication-pictures-upload-dialog/publication-pictures-upload-dialog.component';
import { FileValidator } from 'ngx-material-file-input';
import { PublicationPicturesService } from './../../../core/services/publication-pictures.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Picture } from './../../models/picture';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-publication-pictures-upload',
  templateUrl: './publication-pictures-upload.component.html',
  styleUrls: ['./publication-pictures-upload.component.scss']
})
export class PublicationPicturesUploadComponent implements OnInit, OnDestroy {

  //  For repetition only
  @Input() habitIndex: number;
  @Input() repetitionIndex: number;

  @Input() isRepetitionType = false;
  @Input() publicationId: string;
  @Input() headlinePicture: Picture;
  public picturesForm: FormGroup;
  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];
  private langSub: Subscription;
  public isLargerScreen: boolean;
  private screenSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private publicationPicturesService: PublicationPicturesService,
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
    this.publicationPicturesService.setPicturesForm(this.picturesForm);
    dialogConfig.data = {
      publicationId: this.publicationId,
      headlinePicture: this.headlinePicture,
      isRepetitionType: this.isRepetitionType,
      habitIndex: this.habitIndex,
      repetitionIndex: this.repetitionIndex
    };
    if (this.isLargerScreen) {
      dialogConfig.minWidth = 600;
      dialogConfig.width = '60vw';
    } else {
      dialogConfig.maxWidth = '95vw';
      dialogConfig.width = '95vw';
    }

    const dialogRef = this.dialog.open(PublicationPicturesUploadDialogComponent, dialogConfig);

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
