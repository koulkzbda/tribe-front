import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicturesService {

  private picturesForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(null);
  public readonly picturesForm$: Observable<FormGroup | null> = this.picturesForm.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService
  ) { }

  public addProfilePictures(pictures: File[], profileId: number, profilePictureName?: string): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/profile/pictures`;
    const formData = new FormData();
    formData.append('profileId', profileId.toString());

    if (profilePictureName !== null) {
      formData.append('profilePictureName', profilePictureName);
    }

    pictures.forEach(
      picture => formData.append('files[]', picture)
    );

    return this.http.post<Picture[]>(url, formData).pipe(tap(pictures => {
      const currentProfile = this.profileService.currentProfile;
      currentProfile.profilePictures = pictures;
      this.profileService.setProfile(currentProfile);
    }));
  }

  public setPicturesForm(pictures: FormGroup): void {
    this.picturesForm.next(pictures);
  }

  public setProfilePicture(picture: Picture): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/profile/profile-picture`;

    return this.http.patch<Picture[]>(url, picture).pipe(tap(pictures => {
      const currentProfile = this.profileService.currentProfile;
      currentProfile.profilePictures = pictures;
      this.profileService.setProfile(currentProfile);
    }));
  }

  public deleteProfilePicture(picture: Picture): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/profile/picture/${picture.id}`;

    return this.http.delete<Picture[]>(url).pipe(tap(pictures => {
      const currentProfile = this.profileService.currentProfile;
      currentProfile.profilePictures = pictures;
      this.profileService.setProfile(currentProfile);
    }));
  }

}
