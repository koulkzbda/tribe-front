import { TranslationService } from './../services/translation.service';
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

  constructor(private translationService: TranslationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isPublicRequest(request.url)) {
      request = this.addToken(request, localStorage.getItem('token'));
      request = this.addAccept(request);
      if (!this.withoutHeaders(request.url)) {
        request = this.addContentType(request);
      }
    } else if (this.isAuthRequest(request.url)) {
      request = this.addContentTypeForAuth(request);
      request = this.addCredentials(request);
    }
    request = this.addAcceptLanguage(request);

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

  private addAccept(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Accept: 'application/tribe-back-v1+json'
      }
    });
  }

  private addAcceptLanguage(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Accept-Language': `${this.translationService.getCurrentLang()}`
      }
    });
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isPublicRequest(url: string): boolean {
    return ((url.includes('forgot-passowrd') || url.includes('login') || url.includes('logout') || url.includes('password-reset')) && !url.includes('auto-login'));
  }

  private withoutHeaders(url: string): boolean {
    return (url.includes('profile/pictures') || url.includes('repetition/pictures') || url.includes('publication/pictures'));
  }

  private isAuthRequest(url: string): boolean {
    return (url.includes('login') || url.includes('logout'));
  }
}
