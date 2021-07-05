import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../../../../core/services/translation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-habit-dialog',
  templateUrl: './create-habit-dialog.component.html',
  styleUrls: ['./create-habit-dialog.component.scss']
})
export class CreateHabitDialogComponent implements OnInit, OnDestroy {

  private langSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateHabitDialogComponent>,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.updateLang();
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  public closeDialog(close: boolean): void {
    this.dialogRef.close(close);

  }

  private updateLang(): void {
    this.translate.setDefaultLang(this.translationService.defaultLang);
    this.langSub = this.translationService.currentLang$.subscribe(
      lang => this.translate.use(lang)
    )
  }

}
