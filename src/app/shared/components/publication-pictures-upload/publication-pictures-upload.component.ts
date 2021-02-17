import { PublicationPicturesUploadDialogComponent } from './../publication-pictures-upload-dialog/publication-pictures-upload-dialog.component';
import { FileValidator } from 'ngx-material-file-input';
import { PublicationPicturesService } from './../../../core/services/publication-pictures.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Picture } from './../../models/picture';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-publication-pictures-upload',
  templateUrl: './publication-pictures-upload.component.html',
  styleUrls: ['./publication-pictures-upload.component.scss']
})
export class PublicationPicturesUploadComponent implements OnInit {

  //  For repetition only
  @Input() habitIndex: number;
  @Input() repetitionIndex: number;

  @Input() isRepetitionType = false;
  @Input() publicationId: string;
  @Input() headlinePicture: Picture;
  public picturesForm: FormGroup;
  readonly maxSize = 104857600; // 100 MB
  public imgURLs = [];

  constructor(
    private fb: FormBuilder,
    private publicationPicturesService: PublicationPicturesService,
    public dialog: MatDialog,
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }

  ngOnInit(): void {
    this.initForm();
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.publicationPicturesService.setPicturesForm(this.picturesForm);
    console.log(this.habitIndex, this.repetitionIndex)
    dialogConfig.data = {
      publicationId: this.publicationId,
      headlinePicture: this.headlinePicture,
      isRepetitionType: this.isRepetitionType,
      habitIndex: this.habitIndex,
      repetitionIndex: this.repetitionIndex
    };
    dialogConfig.minWidth = 600;
    dialogConfig.width = '60wv';
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

}
