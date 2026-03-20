import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookie:CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = this.cookie.get("access_token")
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ token)

    const header_clone = request.clone({headers})
    return next.handle(header_clone).pipe(
      catchError((err)=>{
        if ([401,403,500].indexOf(err.status)!==-1) {
        // console.log(err)
        this.cookie.deleteAll()
        sessionStorage.clear()
        this.router.navigate(["/"])
        // this.cronometro._handleResetClick()
        location.reload()
        }
        const error=err.error || err.statusText;
        return throwError(error)
      })
    );
    
  }
}
