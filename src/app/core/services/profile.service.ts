import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Profile } from './../../shared/models/profile';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: BehaviorSubject<Profile | null> = new BehaviorSubject(null);
  public readonly profile$: Observable<Profile | null> = this.profile.asObservable();

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<Profile> {
    const url = `${environment.backend.baseURL}/profile`;

    return this.http.get<Profile>(url).pipe(tap(profile => this.setProfile(profile)));
  }

  public setProfile(profile: Profile): void {
    this.profile.next(profile);
  }

  public editBio(profile: Profile): Observable<Profile> {
    const url = `${environment.backend.baseURL}/profile/bio`;

    return this.http.post<Profile>(url, profile).pipe(tap(profile => {
      const currentProfile = this.currentProfile;
      currentProfile.bio = profile.bio;
      this.setProfile(currentProfile);
    }));
  }

  get currentProfile(): Profile {
    return this.profile.getValue();
  }
}
