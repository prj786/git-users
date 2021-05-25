import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpEvent, HttpRequest,
  HttpHandler
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    return next.handle(httpRequest).pipe(
      catchError((error) => {
        this.loaderService.showError(error.status);
        setTimeout(() => {
          this.loaderService.hideError();
        }, 3000);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }
}
