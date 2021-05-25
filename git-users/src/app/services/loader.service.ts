import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: Subject<boolean> = new Subject<boolean>();
  error: Subject<string> = new Subject<string>();

  showLoader(): void {
    this.loading.next(true);
  }

  hideLoader(): void {
    this.loading.next(false);
  }

  showError(status): void {
    console.log(status);
    this.error.next(status);
  }

  hideError(): void {
    this.error.next(null);
  }

}
