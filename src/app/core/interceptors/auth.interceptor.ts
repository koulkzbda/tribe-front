import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isPublicRequest(request.url)) {
      request = this.addContentType(request);
    } else if (this.isAuthRequest(request.url)) {
      request = this.addContentTypeForAuth(request);
    }
    request = this.addCredentials(request);

    return next.handle(request);
  }

  private addContentType(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  private addContentTypeForAuth(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  private addCredentials(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      withCredentials: true
    });
  }

  private isPublicRequest(url: string): boolean {
    return (url.includes('forgot-passowrd') || url.includes('login') || url.includes('logout') || url.includes('password-reset'));
  }

  private isAuthRequest(url: string): boolean {
    return (url.includes('login') || url.includes('logout'));
  }
}
