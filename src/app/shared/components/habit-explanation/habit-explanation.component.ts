import { LayoutService } from './../../../core/services/layout.service';
import { TranslationService } from './../../../core/services/translation.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

declare var LeaderLine: any;

@Component({
  selector: 'app-habit-explanation',
  templateUrl: './habit-explanation.component.html',
  styleUrls: ['./habit-explanation.component.scss']
})
export class HabitExplanationComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() fontSizeBigger = false;
  @ViewChild('cueCard') cueCard: ElementRef<HTMLElement>;
  @ViewChild('cravingCard') cravingCard: ElementRef<HTMLElement>;
  @ViewChild('responseCard') responseCard: ElementRef<HTMLElement>;
  @ViewChild('rewardCard') rewardCard: ElementRef<HTMLElement>;
  public cueToCraving: any;
  public cravingToResponse: any;
  public responseToReward: any;
  public rewardToCue: any;
  public lang: string;
  public innerWidth: number;
  public sidenavOpen: boolean;
  private langSub: Subscription;
  private widthSub: Subscription;
  private sidenavSub: Subscription;
  private deleteArrowSub: Subscription;

  public headers = {
    en: [{ friendlyName: 'Step', attribute: 'step' }, { friendlyName: 'Law of Behavior Change', attribute: 'law' }],
    fr: [{ friendlyName: 'Phase', attribute: 'step' }, { friendlyName: 'Loi du changement de comportement', attribute: 'law' }]
  };

  public content = {
    en: [
      { step: 'Cue', law: 'Make it obvious' },
      { step: 'Craving', law: 'Make it attracting' },
      { step: 'Response', law: 'Make it easy' },
      { step: 'Reward', law: 'Make it satisfying' },
    ],
    fr: [
      { step: 'Déclancheur', law: "L'évidence" },
      { step: 'Envie', law: "L'attractivité" },
      { step: 'Réponse', law: 'La facilité' },
      { step: 'Récompense', law: 'La satisfaction' },
    ]
  };

  constructor(
    private translationService: TranslationService,
    private layoutService: LayoutService
  ) { }

  get headersName(): string[] {
    return this.headers[this.lang].map(header => header.friendlyName);
  }

  ngOnInit(): void {
    this.getLang();
  }

  ngAfterViewInit(): void {
    of(true).pipe(
      delay(1),
      tap(_ => this.hideArrowsUpdate()),
      tap(_ => this.setArrowPositions()),
      tap(_ => this.sidenavOpenUpdate()),
      tap(_ => this.getWidth())
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.langSub) this.langSub.unsubscribe();
    if (this.widthSub) this.widthSub.unsubscribe();
    if (this.sidenavSub) this.sidenavSub.unsubscribe();
    if (this.deleteArrowSub) this.deleteArrowSub.unsubscribe();
    this.removeArrows();
  }


  public setArrowPositions(): void {
    this.removeArrows();
    const fullscreenThreshold = this.sidenavOpen ? 1490 : 1199;

    if (this.innerWidth < 436) {
      this.updateSocketsforExtraThinnerScreen();
    } else if (this.innerWidth < fullscreenThreshold && this.innerWidth >= 436) {
      this.updateSocketsforThinnerScreen();
    } else {
      this.updateSocketsforLargerScreen();
    }
  }

  private updateSocketsforLargerScreen(): void {
    this.cueToCraving = new LeaderLine(this.cueCard?.nativeElement, this.cravingCard?.nativeElement);
    this.cueToCraving?.setOptions({ startSocket: 'right', endSocket: 'left', middleLabel: LeaderLine.pathLabel('An obvious cue triggers a craving') });

    this.cravingToResponse = new LeaderLine(this.cravingCard?.nativeElement, this.responseCard?.nativeElement);
    this.cravingToResponse.setOptions(
      {
        path: 'arc',
        middleLabel: LeaderLine.pathLabel('An attractive craving motivates a response'),
      }
    );

    this.responseToReward = new LeaderLine(this.rewardCard?.nativeElement, this.responseCard?.nativeElement);
    this.responseToReward?.setOptions(
      {
        startSocket: 'right',
        endSocket: 'left',
        middleLabel: LeaderLine.pathLabel('The response provides a reward'),
        startLabel: LeaderLine.captionLabel('The easier a response is, the more likely it is'),
        startPlug: "arrow1",
        endPlug: "behind"
      }
    );

    this.rewardToCue = new LeaderLine(this.rewardCard?.nativeElement, this.cueCard?.nativeElement);
    this.rewardToCue?.setOptions({
      path: 'arc',
      startSocket: 'top',
      endSocket: 'bottom',
      middleLabel: LeaderLine.pathLabel('A reward satisfies the craving'),
      endLabel: LeaderLine.captionLabel('And become associated with the cue', { offset: [10, 0] })
    });
  }

  private updateSocketsforThinnerScreen(): void {
    const XCravingAnchor = this.innerWidth <= 768 ? '90%' : this.innerWidth > 990 ? '40%' : '75%';
    this.cueToCraving = new LeaderLine(
      this.cueCard?.nativeElement,
      LeaderLine.pointAnchor(this.cravingCard?.nativeElement, { x: XCravingAnchor, y: 0 })
    );
    const cueToCravingStartGravity = this.innerWidth <= 768 ? 'auto' : this.innerWidth > 990 ? [450, 0] : [300, 0];
    const cueToCravingEndity = this.innerWidth > 990 ? [0, 10] : 'auto';
    this.cueToCraving?.setOptions({
      startSocket: 'right',
      startSocketGravity: cueToCravingStartGravity,
      endSocketGravity: cueToCravingEndity,
      middleLabel: LeaderLine.pathLabel('An obvious cue triggers a craving')
    });

    this.cravingToResponse = new LeaderLine(this.cravingCard?.nativeElement, this.responseCard?.nativeElement);
    this.cravingToResponse.setOptions(
      {
        middleLabel: LeaderLine.pathLabel('An attractive craving motivates a response'),
      }
    );

    this.responseToReward = new LeaderLine(
      this.rewardCard?.nativeElement,
      LeaderLine.pointAnchor(this.responseCard?.nativeElement, { x: '90%', y: '100%' })
    );
    const responseToRewardGravity = this.innerWidth > 750 ? [0, 100] : 'auto';
    this.responseToReward?.setOptions({
      endSocketGravity: responseToRewardGravity,
      startSocket: 'right',
      middleLabel: LeaderLine.pathLabel('The response provides a reward'),
      endLabel: LeaderLine.captionLabel('Easier a response is, more likely it is', { offset: [-280, 0] }),
      startPlug: "arrow1",
      endPlug: "behind"
    });

    this.rewardToCue = new LeaderLine(
      LeaderLine.pointAnchor(this.rewardCard?.nativeElement, { x: 25, y: 0 }),
      LeaderLine.pointAnchor(this.cueCard?.nativeElement, { x: 25, y: '100%' })
    );
    this.rewardToCue.setOptions({ middleLabel: LeaderLine.pathLabel('A reward satisfies the craving and become associated with the cue') });

  }

  private updateSocketsforExtraThinnerScreen(): void {
    this.cueToCraving = new LeaderLine(
      this.cueCard?.nativeElement,
      LeaderLine.pointAnchor(this.cravingCard?.nativeElement, { x: '100%', y: 0 })
    );
    this.cueToCraving?.setOptions({
      path: 'grid',
      startSocket: 'right',
      middleLabel: LeaderLine.pathLabel('An obvious cue triggers a craving')
    });

    this.cravingToResponse = new LeaderLine(this.cravingCard?.nativeElement, this.responseCard?.nativeElement);
    this.cravingToResponse.setOptions(
      {
        middleLabel: LeaderLine.pathLabel('An attractive craving motivates a response'),
      }
    );

    this.responseToReward = new LeaderLine(
      LeaderLine.pointAnchor(this.responseCard?.nativeElement, { x: '100%', y: '100%' }),
      this.rewardCard?.nativeElement);
    this.responseToReward?.setOptions({
      path: 'grid',
      endSocket: 'right',
      middleLabel: LeaderLine.pathLabel('The response provides a reward'),
      startLabel: LeaderLine.captionLabel('Easier a response is, more likely it is', { offset: [-260, 0] })
    });

    this.rewardToCue = new LeaderLine(
      LeaderLine.pointAnchor(this.rewardCard?.nativeElement, { x: 20, y: 0 }),
      LeaderLine.pointAnchor(this.cueCard?.nativeElement, { x: 20, y: '100%' })
    );
    this.rewardToCue.setOptions({ middleLabel: LeaderLine.pathLabel('A reward satisfies the craving and become associated with the cue') });

  }

  private getLang(): void {
    this.langSub = this.translationService.currentLang$.subscribe(lang => this.lang = lang);
  }

  private getWidth(): void {
    this.widthSub = this.layoutService.innerWidth$.subscribe(width => {
      this.innerWidth = width;
      this.setArrowPositions();
    });
  }

  private sidenavOpenUpdate(): void {
    this.sidenavSub = this.layoutService.updateArrowsPosition$.subscribe(sidenavOpen => {
      this.sidenavOpen = sidenavOpen;
      this.setArrowPositions();
    });
  }

  private hideArrowsUpdate(): void {
    this.deleteArrowSub = this.layoutService.hideArrows$.subscribe(hide => {
      if (hide) {
        this.hideArrows();
      } else {
        this.showArrows();
      }
    });
  }

  private removeArrows(): void {
    if (this.cueToCraving && this.cravingToResponse && this.responseToReward && this.rewardToCue) {
      this.cueToCraving?.remove();
      this.cravingToResponse?.remove();
      this.responseToReward?.remove();
      this.rewardToCue?.remove();
    }
  }

  private hideArrows(): void {
    if (this.cueToCraving && this.cravingToResponse && this.responseToReward && this.rewardToCue) {
      this.cueToCraving?.hide();
      this.cravingToResponse?.hide();
      this.responseToReward?.hide();
      this.rewardToCue?.hide();
    }
  }

  private showArrows(): void {
    if (this.cueToCraving && this.cravingToResponse && this.responseToReward && this.rewardToCue) {
      this.cueToCraving?.show();
      this.cravingToResponse?.show();
      this.responseToReward?.show();
      this.rewardToCue?.show();
    } else {
      this.setArrowPositions();
    }
  }



}
