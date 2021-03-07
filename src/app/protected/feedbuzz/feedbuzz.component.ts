import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../../core/services/translation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-feedbuzz',
  templateUrl: './feedbuzz.component.html',
  styleUrls: ['./feedbuzz.component.scss']
})
export class FeedbuzzComponent implements OnInit, OnDestroy {

  private langSub: Subscription;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
