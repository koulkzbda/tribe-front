import { environment } from './../../../../environments/environment';
import { Subscription } from 'rxjs';
import { LayoutService } from './../../../core/services/layout.service';
import { ProfilePicturesCarouselDialogComponent } from './../profile-pictures-carousel-dialog/profile-pictures-carousel-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PictureDisplayingService } from './../../../core/services/picture-displaying.service';
import { Picture, Pictures } from './../../../shared/models/picture';
import { Profile } from './../../../shared/models/profile';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html',
  styleUrls: ['./profile-pictures.component.scss']
})
export class ProfilePicturesComponent implements OnInit, OnDestroy {

  @Input() currentUserId: string;
  @Input() profile: Profile;
  public isLargerScreen: boolean;
  public screenSub: Subscription;
  public assetPath = environment.assetsPath;

  constructor(
    public pictureDisplayingService: PictureDisplayingService,
    private layoutService: LayoutService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.screenSub = this.layoutService.onLargerScreen$
      .subscribe(isLargerScreen => this.isLargerScreen = isLargerScreen);
  }

  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
  }

  get profilePicture(): Picture | null {
    return this.profile.profilePictures.filter(picture => picture.isHeadlinePicture)[0] || this.profile.profilePictures[0];
  }

  get otherPictures(): Picture[] {
    return this.profile.profilePictures.some(picture => picture.isHeadlinePicture) ?
      this.profile.profilePictures.filter(picture => !picture.isHeadlinePicture) : this.profile.profilePictures.slice(1);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100vw';
    dialogConfig.width = this.isLargerScreen ? '55vw' : '100vw';
    dialogConfig.height = '80vh';
    dialogConfig.maxHeight = '115vw';
    dialogConfig.data = new Pictures(this.profilePicture, this.otherPictures, this.currentUserId == this.profile.userId);
    const dialogRef = this.dialog.open(ProfilePicturesCarouselDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => { });
  }

}
