import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { FeedbuzzRoutingModule } from './feedbuzz-routing.module';
import { FeedbuzzComponent } from './feedbuzz.component';
import { HabitStacksListComponent } from './components/habit-stacks-list/habit-stacks-list.component';


@NgModule({
  declarations: [FeedbuzzComponent, HabitStacksListComponent],
  imports: [
    SharedModule,
    FeedbuzzRoutingModule
  ]
})
export class FeedbuzzModule { }
