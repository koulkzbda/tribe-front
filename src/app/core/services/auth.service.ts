import { ProfileService } from './profile.service';
import { User } from './../../shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly user$: Observable<User | null> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router,
  ) { }

  public login(email: string, pass: string): Observable<User | null> {
    const url = `${environment.backend.baseURL}/login`;
    const data = new HttpParams().set('username', email).set('password', pass);

    return this.http.post<User | null>(url, data).pipe(
      tap(user => this.user.next(user)),
      tap(_ => this.profileService.getProfile().subscribe())
    );
  }

  public logout(): Observable<User | null> {
    const url = `${environment.backend.baseURL}/logout`;

    return this.http.post<User | null>(url, null).pipe(
      tap(_ => this.user.next(null))
    );
  }

  get currentUser(): User {
    return this.user.getValue();
  }

}
