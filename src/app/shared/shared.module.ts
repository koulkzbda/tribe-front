import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { TriStateCheckboxComponent } from './components/tri-state-checkbox/tri-state-checkbox.component';
import { PublicationCarouselComponent } from './components/publication-carousel/publication-carousel.component';
import { PublicationPicturesUploadComponent } from './components/publication-pictures-upload/publication-pictures-upload.component';
import { PublicationPicturesUploadDialogComponent } from './components/publication-pictures-upload-dialog/publication-pictures-upload-dialog.component';



@NgModule({
  declarations: [SidenavComponent, TriStateCheckboxComponent, PublicationCarouselComponent, PublicationPicturesUploadComponent, PublicationPicturesUploadDialogComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxUsefulSwiperModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SidenavComponent,
    NgxUsefulSwiperModule,
    TriStateCheckboxComponent,
    PublicationCarouselComponent,
    PublicationPicturesUploadComponent,
    PublicationPicturesUploadDialogComponent
  ]
})
export class SharedModule { }
