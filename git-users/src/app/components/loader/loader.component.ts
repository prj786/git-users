import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading: Subject<boolean> = this.loader.loading;
  errorSub: Subject<string> = this.loader.error;
  error;

  constructor(public loader: LoaderService) {
    this.errorSub.subscribe(error => this.error = error);
  }

}
