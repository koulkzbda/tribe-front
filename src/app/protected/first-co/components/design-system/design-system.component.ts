import { LayoutService } from './../../../../core/services/layout.service';
import { GoToNextStep } from './../../../../shared/models/utils/go-to-next-step';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss']
})
export class DesignSystemComponent implements OnInit {

  @Input() stepIndex: number;
  @Output() goToNextStep = new EventEmitter<GoToNextStep>();
  public systemName: string;
  public systemFormVisible = true;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  public onSystemNameSubmitted(systemName: string): void {
    this.systemName = systemName;
    this.systemFormVisible = false;
  }

  public updateArrowPosition(): void {
    this.layoutService.setUpdateArrowsPosition();
  }

  public onHabitFormSubmitted(isFormSubmitted: boolean): void {
    this.goToNextStep.emit(new GoToNextStep(this.stepIndex, isFormSubmitted));

  }

}
