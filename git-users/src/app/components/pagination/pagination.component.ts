import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() public reset = false;

  @Output() pageTo: EventEmitter<any> = new EventEmitter<any>();

  public prevNumber = null;
  public activeNumber = 1;
  public nextNumber = 2;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset && this.reset && this.activeNumber !== 1) {
        this.nextNumber = 2;
        this.activeNumber = 1;
        this.prevNumber = null;
    }
  }

  goTo(selector: number): void {
    this.pageTo.emit(selector);
    console.log(selector);
    if (!selector) {
      this.activeNumber = 1;
      return;
    }
    this.activeNumber = selector;
    this.prevNumber = selector - 1;
    this.nextNumber = selector + 1;
  }

}
