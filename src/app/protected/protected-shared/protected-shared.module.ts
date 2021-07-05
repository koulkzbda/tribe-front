import { CreateSystemComponent } from './components/create-system/create-system.component';
import { IdentityListComponent } from './components/identity-list/identity-list.component';
import { CreateHabitComponent } from './components/create-habit/create-habit.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { MetricsFormComponent } from './components/metrics-form/metrics-form.component';
import { HabitDetailsFormComponent } from './components/habit-details-form/habit-details-form.component';
import { StepFromComponent } from './components/step-from/step-from.component';
import { IdentitiesFormComponent } from './components/identities-form/identities-form.component';
import { IdentitiesPanelFormComponent } from './components/identities-panel-form/identities-panel-form.component';
import { WeekdaysFormComponent } from './components/weekdays-form/weekdays-form.component';
import { CreateHabitDialogComponent } from './components/create-habit-dialog/create-habit-dialog.component';
import { ProtectedBannerComponent } from './components/protected-banner/protected-banner.component';



@NgModule({
  declarations: [
    LocationFormComponent,
    CreateHabitComponent,
    MetricsFormComponent,
    HabitDetailsFormComponent,
    StepFromComponent,
    IdentitiesFormComponent,
    IdentitiesPanelFormComponent,
    WeekdaysFormComponent,
    IdentityListComponent,
    CreateSystemComponent,
    CreateHabitDialogComponent,
    ProtectedBannerComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [SharedModule,
    LocationFormComponent,
    CreateHabitComponent,
    MetricsFormComponent,
    HabitDetailsFormComponent,
    StepFromComponent,
    IdentitiesFormComponent,
    IdentitiesPanelFormComponent,
    WeekdaysFormComponent,
    IdentityListComponent,
    CreateSystemComponent,
    CreateHabitDialogComponent,
    ProtectedBannerComponent,
  ]
})
export class ProtectedSharedModule { }
