import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../../../app.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public voteItems: IVoteItem[] = [] as IVoteItem[];

  @Input()
  public attemptCount: number = 0;

  public isMobile: boolean = window.innerWidth < 1024;
}
