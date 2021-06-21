import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { MemberProfile } from './../../shared/models/profile';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: BehaviorSubject<MemberProfile | null> = new BehaviorSubject(null);
  public readonly profile$: Observable<MemberProfile | null> = this.profile.asObservable();

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<MemberProfile> {
    const url = `${environment.backend.baseURL}/profile`;

    return this.http.get<MemberProfile>(url).pipe(tap(profile => this.setProfile(profile)));
  }

  public setProfile(profile: MemberProfile): void {
    this.profile.next(profile);
  }

  public editBio(profile: MemberProfile): Observable<MemberProfile> {
    const url = `${environment.backend.baseURL}/profile/bio`;

    return this.http.post<MemberProfile>(url, profile).pipe(tap(profile => {
      const currentProfile = this.currentProfile;
      currentProfile.bio = profile.bio;
      this.setProfile(currentProfile);
    }));
  }

  get currentProfile(): MemberProfile {
    return this.profile.getValue();
  }
}
