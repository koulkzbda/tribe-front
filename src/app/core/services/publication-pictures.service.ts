import { FormGroup } from '@angular/forms';
import { Picture } from './../../shared/models/picture';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationPicturesService {

  private picturesForm: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  public readonly picturesForm$: Observable<FormGroup> = this.picturesForm.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public setHeadlinePicture(picture: Picture, publicationId: string, isRepetitionType?: boolean): Observable<Picture[]> {
    const controllerName = isRepetitionType ? 'habit-stack-feedbuzz/repetition' : 'publication';
    const url = `${environment.backend.baseURL}/${controllerName}/headline-picture?publicationId=${publicationId}`;

    return this.http.patch<Picture[]>(url, picture);
  }

  public deletePicture(picture: Picture, publicationId: string, isRepetitionType?: boolean): Observable<Picture[]> {
    const controllerName = isRepetitionType ? 'habit-stack-feedbuzz/repetition' : 'publication';
    const url = `${environment.backend.baseURL}/${controllerName}/picture?publicationId=${publicationId}&pictureId=${picture.id}`;

    return this.http.delete<Picture[]>(url);
  }

  public addPublicationPictures(pictures: File[], publicationId: string, headlinePictureName?: string, isRepetitionType?: boolean): Observable<Picture[]> {
    const controllerName = isRepetitionType ? 'habit-stack-feedbuzz/repetition' : 'publication';
    const url = `${environment.backend.baseURL}/${controllerName}/pictures`;
    const formData = new FormData();
    formData.append('publicationId', publicationId);

    if (headlinePictureName !== null) {
      formData.append('headlinePictureName', headlinePictureName);
    }

    pictures.forEach(
      picture => formData.append('files[]', picture)
    );

    return this.http.post<Picture[]>(url, formData);
  }

  public setPicturesForm(pictures: FormGroup): void {
    this.picturesForm.next(pictures);
  }
}
