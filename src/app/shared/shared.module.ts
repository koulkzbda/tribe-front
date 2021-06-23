import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { TriStateCheckboxComponent } from './components/tri-state-checkbox/tri-state-checkbox.component';
import { PublicationCarouselComponent } from './components/publication-carousel/publication-carousel.component';
import { PublicationPicturesUploadComponent } from './components/publication-pictures-upload/publication-pictures-upload.component';
import { PublicationPicturesUploadDialogComponent } from './components/publication-pictures-upload-dialog/publication-pictures-upload-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HabitExplanationComponent } from './components/habit-explanation/habit-explanation.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SidenavComponent,
    TriStateCheckboxComponent,
    PublicationCarouselComponent,
    PublicationPicturesUploadComponent,
    PublicationPicturesUploadDialogComponent,
    HabitExplanationComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    FlexLayoutModule,
    TriStateCheckboxComponent,
    PublicationCarouselComponent,
    PublicationPicturesUploadComponent,
    PublicationPicturesUploadDialogComponent,
    TranslateModule,
    HabitExplanationComponent,
  ]
})
export class SharedModule { }
