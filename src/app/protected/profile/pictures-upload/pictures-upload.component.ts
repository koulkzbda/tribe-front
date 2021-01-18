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

  constructor(
    private fb: FormBuilder,
    private profilePicturesService: ProfilePicturesService,
    public dialog: MatDialog,
  ) { }

  get pictures(): AbstractControl { return this.picturesForm.get('pictures'); }

  ngOnInit(): void {
    this.picturesForm = this.fb.group({
      pictures: [undefined, [
        Validators.required,
        FileValidator.maxContentSize(this.maxSize)
      ]],
      headlineIndex: [null, []]
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.profilePicturesService.setPicturesForm(this.picturesForm);
    dialogConfig.data = { profileId: this.profileId, profilePicture: this.profilePicture };
    dialogConfig.minWidth = 600;
    dialogConfig.width = '60wv';
    const dialogRef = this.dialog.open(UploadDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => { });
  }

}
