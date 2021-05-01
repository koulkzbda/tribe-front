import { FormGroup } from '@angular/forms';
import { UserCreation } from './../../shared/models/user-creation';
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

  private userEmail: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public readonly userEmail$: Observable<string | null> = this.userEmail.asObservable();

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router,
  ) { }

  public login(email: string, pass: string): Observable<User | null> {
    const url = `${environment.backend.baseURL}/login`;
    const data = new HttpParams().set('username', email).set('password', pass);

    return this.http.post<User | null>(url, data).pipe(
      tap(user => {
        this.user.next(user);
        this.saveAuthData(user.token);
      }),
      tap(_ => this.profileService.getProfile().subscribe())
    );
  }

  public autoLogin(): Observable<User | null> {
    const url = `${environment.backend.baseURL}/auto-login`;

    return this.http.get<User | null>(url).pipe(
      tap(user => {
        this.user.next(user);
        this.saveAuthData(user.token);
      }),
      tap(_ => this.profileService.getProfile().subscribe()),
      tap(_ => this.router.navigate(['/user']))
    );
  }

  public logout(): Observable<User | null> {
    const url = `${environment.backend.baseURL}/logout`;

    return this.http.post<User | null>(url, null).pipe(
      tap(_ => this.user.next(null)),
      tap(_ => {
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
      }),
    );
  }

  public register(user: UserCreation): Observable<UserCreation | null> {
    const url = `${environment.backend.baseURL}/register`;
    user.emailConfirmationUrlTemplate = `${environment.frontend.baseURL}/email-confirmation`;

    return this.http.post<UserCreation | null>(url, user);
  }

  public confirmEmail(token: string, id: string): Observable<User | null> {
    const url = `${environment.backend.baseURL}/confirmation?id=${id}&token=${token}`;

    return this.http.get<User | null>(url);
  }

  public setUserEmail(email: string): void {
    this.userEmail.next(email);
  }

  public sendResetPaswordEmail(emailUser: string): Observable<User> {
    const resetPasswordUrl = `${environment.frontend.baseURL}/reset-password`;
    const url = `${environment.backend.baseURL}/forgot-password?email=${emailUser}&resetPasswordUrl=${resetPasswordUrl}`;

    return this.http.get<User>(url);
  }

  public resetPassword(passwordForm: FormGroup): Observable<User> {
    const params = `?id=${passwordForm.value.id}&token=${passwordForm.value.token}&password=${passwordForm.value.password1}`;
    const url = `${environment.backend.baseURL}/reset-password${params}`;

    return this.http.get<User>(url);
  }

  get currentUser(): User {
    return this.user.getValue();
  }

  private saveAuthData(token: string): void {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
  }

}
