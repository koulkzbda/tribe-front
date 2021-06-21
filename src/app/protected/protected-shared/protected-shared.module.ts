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



@NgModule({
  declarations: [LocationFormComponent, CreateHabitComponent, MetricsFormComponent, HabitDetailsFormComponent, StepFromComponent, IdentitiesFormComponent, IdentitiesPanelFormComponent, WeekdaysFormComponent],
  imports: [
    SharedModule
  ],
  exports: [SharedModule, LocationFormComponent, CreateHabitComponent, MetricsFormComponent, HabitDetailsFormComponent, StepFromComponent, IdentitiesFormComponent, IdentitiesPanelFormComponent, WeekdaysFormComponent]
})
export class ProtectedSharedModule { }
