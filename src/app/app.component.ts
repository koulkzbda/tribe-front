import { Subscription } from 'rxjs';
import { TranslationService } from './core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
