import { ProtectedSharedModule } from './../protected-shared/protected-shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { PicturesUploadComponent } from './pictures-upload/pictures-upload.component';
import { ProfilePicturesComponent } from './profile-pictures/profile-pictures.component';
import { ProfileBioComponent } from './profile-bio/profile-bio.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { ProfilePicturesCarouselDialogComponent } from './profile-pictures-carousel-dialog/profile-pictures-carousel-dialog.component';



@NgModule({
  declarations: [ProfileComponent, PicturesUploadComponent, ProfilePicturesComponent, ProfileBioComponent, UploadDialogComponent, ProfilePicturesCarouselDialogComponent],
  imports: [
    ProtectedSharedModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
