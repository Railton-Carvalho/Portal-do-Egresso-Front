import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticationService } from '../services/autentication.service';
import { environment } from '../environments/environments';


const apiUrl = environment.apiUrl;

const EXCLUDE_URLS = [`${apiUrl}/auth`]; 


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AutenticationService ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const isExcluded = EXCLUDE_URLS.some(url => req.url.includes(url));

    if (token && !isExcluded) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }



    return next.handle(req);
  }
}
