import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxUsefulSwiperModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SidenavComponent,
    NgxUsefulSwiperModule,
  ]
})
export class SharedModule { }
