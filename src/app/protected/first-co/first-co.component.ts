import { TranslationService } from './../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';
import { LayoutService } from './../../core/services/layout.service';
import { GoToNextStep } from './../../shared/models/utils/go-to-next-step';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-first-co',
  templateUrl: './first-co.component.html',
  styleUrls: ['./first-co.component.scss']
})
export class FirstCoComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;
  public indexCompleted = -1;
  private langSub: Subscription;


  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.updateLang();
    of(true).pipe(
      delay(1000),
      tap(_ => this.layoutService.closeSidenav())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
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
      this.router.navigate(['/user/feedbuzz']);
    }
  }

  public onStepChange(event: any): void {
    this.layoutService.setHideArrows(event.selectedIndex != 1);
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
