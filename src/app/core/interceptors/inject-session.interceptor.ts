import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { AuthService } from '@modules/auth/services';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const authToken = this.authSvc.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(request);
  }
}
