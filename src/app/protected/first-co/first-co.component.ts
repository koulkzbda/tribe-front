import { Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';
import { LayoutService } from './../../core/services/layout.service';
import { GoToNextStep } from './../../shared/models/utils/go-to-next-step';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { of } from 'rxjs';

@Component({
  selector: 'app-first-co',
  templateUrl: './first-co.component.html',
  styleUrls: ['./first-co.component.scss']
})
export class FirstCoComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  public indexCompleted = -1;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    of(true).pipe(
      delay(1000),
      tap(_ => this.layoutService.closeSidenav())
    ).subscribe();
  }

  public onChangeStep(goToNextStep: GoToNextStep): void {
    if (goToNextStep.stepValid) {
      this.stepper.selected.completed = true;
      this.stepper.next();
      this.indexCompleted = goToNextStep.index;
    } else {
      this.indexCompleted = goToNextStep.index - 1;
    }

    if (this.indexCompleted == 1) {
      this.router.navigate(['/user']);
    }
  }

  public onStepChange(event: any): void {
    this.layoutService.setHideArrows(event.selectedIndex != 1);
  }

}
