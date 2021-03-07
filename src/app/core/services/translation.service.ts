import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang: BehaviorSubject<string> = new BehaviorSubject(null);
  public readonly currentLang$: Observable<string> = this.currentLang.asObservable();
  public defaultLang = 'en';

  constructor(public translate: TranslateService) {
    const currentLanguage = this.translate.getBrowserLang();
    this.setCurrentLang(currentLanguage);

  }

  public setCurrentLang(lang: string): void {
    this.currentLang.next(lang);
  }

  public isEnglish(): boolean {
    return this.currentLang.value == 'en';
  }
}
