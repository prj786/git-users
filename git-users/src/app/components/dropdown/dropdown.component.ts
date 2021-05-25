import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import {ListModel} from '../../models';
import {faArrowsAltV} from '@fortawesome/free-solid-svg-icons/faArrowsAltV';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() listItems: ListModel[] = [];
  @Input() selectAll = false;
  @Input() placeholder = '';

  @Output() public opener: EventEmitter<any> = new EventEmitter<any>();

  public selectedName;
  public opened = false;
  public arrow = faArrowsAltV;

  changeValue(item: ListModel): void {
    if (!item) {
      this.selectedName = this.placeholder;
      this.opener.emit(null);
      return;
    }
    this.selectedName = item.name;
    this.opener.emit(item.value);
  }

}
