import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SidenavComponent,
  ]
})
export class SharedModule { }
