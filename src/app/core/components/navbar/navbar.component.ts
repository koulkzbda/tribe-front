import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public homePath = 'home';
  public loginPath = 'login';
  public registerPath = 'register';
  public user: User;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub =
      this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
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
