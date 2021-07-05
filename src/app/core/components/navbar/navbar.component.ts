import { LayoutService } from './../../services/layout.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public homePath = 'home';
  public loginPath = 'login';
  public registerPath = 'register';
  public rootPath = 'user';
  public assetPath = environment.assetsPath;
  public feedbuzzPath = `${this.rootPath}/feedbuzz`;
  public user: User;
  private userSub: Subscription;
  public isSidenavOpened$: Observable<boolean>;
  public isOnHomePage$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.userSub =
      this.authService.user$.subscribe(user => this.user = user);
    this.isSidenavOpened$ = this.layoutService.sidenavOpened$;
    this.isOnHomePage$ = this.layoutService.isOnHomePage$;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public toggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  public logout(): void {
    this.authService.logout().subscribe(
      _ => this.router.navigate(['/login'])
    );
  }

}
