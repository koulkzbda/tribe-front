import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Profile } from './../../shared/models/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<Profile> {
    const url = `${environment.backend.baseURL}/profile`;

    return this.http.get<Profile>(url);
  }
}
