import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MaterialModule } from './../shared/modules/material.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    PublicModule,
    ProtectedModule
  ],
  exports: [NavbarComponent,],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}
