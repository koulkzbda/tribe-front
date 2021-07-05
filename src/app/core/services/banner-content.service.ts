import { LayoutService } from './layout.service';
import { CreateHabitDialogComponent } from './../../protected/protected-shared/components/create-habit-dialog/create-habit-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, BehaviorSubject } from 'rxjs';
import { BannerContent } from './../../shared/models/utils/banner-content';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerContentService {

  private content: BehaviorSubject<BannerContent> = new BehaviorSubject(null);
  public readonly content$: Observable<BannerContent> = this.content.asObservable();
  private innerWidth: number;

  constructor(
    public dialog: MatDialog,
    private layoutService: LayoutService
  ) {
    this.getWidth();
  }

  public performAction(content: BannerContent): void {
    switch (content.action) {
      case 'createHabit':
        const dialogConfig = new MatDialogConfig();
        console.log(this.innerWidth, 450 / 0.8)
        if (this.innerWidth < 450 / 0.8) {
          dialogConfig.width = '100vw';
          dialogConfig.maxWidth = '100vw';
        } else {
          dialogConfig.width = '80vw';
        }

        dialogConfig.height = '100%';
        dialogConfig.maxHeight = '100%';
        const dialogRef = this.dialog.open(CreateHabitDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(_ => { this.setContent(null); });
        break;

      default:
        break;
    }
  }

  public setContent(content: BannerContent): void {
    this.content.next(content);
  }

  private getWidth(): void {
    this.layoutService.innerWidth$.subscribe(width => {
      this.innerWidth = width;
    });
  }
}
