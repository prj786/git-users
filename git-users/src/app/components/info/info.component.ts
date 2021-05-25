import {Component, Input} from '@angular/core';
import {User} from '../../models';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() userInfo: User;
  arrowRight = faArrowCircleRight;
}
