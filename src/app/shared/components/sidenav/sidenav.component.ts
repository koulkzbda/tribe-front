import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './../../models/user';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public prefix = 'user';
  public profilePath = `${this.prefix}/profile`;
  public userSub: Subscription;
  public user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }
}
