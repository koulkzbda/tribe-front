import { FormGroup } from '@angular/forms';
import { Picture } from './../../shared/models/picture';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationPicturesService {

  private picturesForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(null);
  public readonly picturesForm$: Observable<FormGroup | null> = this.picturesForm.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public setHeadlinePicture(picture: Picture): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/publication/headline-picture`;

    return this.http.patch<Picture[]>(url, picture)
      // .pipe(tap(pictures => {
      // const currentProfile = this.profileService.currentProfile;
      // currentProfile.profilePictures = pictures;
      // this.profileService.setProfile(currentProfile);
      // }))
      ;
  }

  public deletePicture(picture: Picture): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/publication/picture/${picture.id}`;

    return this.http.delete<Picture[]>(url)
      // .pipe(tap(pictures => {
      // const currentProfile = this.profileService.currentProfile;
      // currentProfile.profilePictures = pictures;
      // this.profileService.setProfile(currentProfile);
      // }))
      ;
  }

  public addPublicationPictures(pictures: File[], publicationId: string, headlinePictureName?: string): Observable<Picture[]> {
    const url = `${environment.backend.baseURL}/publication/pictures`;
    const formData = new FormData();
    formData.append('publicationId', publicationId);

    if (headlinePictureName !== null) {
      formData.append('headlinePictureName', headlinePictureName);
    }

    pictures.forEach(
      picture => formData.append('files[]', picture)
    );

    return this.http.post<Picture[]>(url, formData)
      // .pipe(tap(pictures => {
      // const currentProfile = this.profileService.currentProfile;
      // currentProfile.profilePictures = pictures;
      // this.profileService.setProfile(currentProfile);
      // }))
      ;
  }

  public setPicturesForm(pictures: FormGroup): void {
    this.picturesForm.next(pictures);
  }
}
