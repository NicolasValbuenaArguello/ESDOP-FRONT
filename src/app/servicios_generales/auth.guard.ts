import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cokie = inject(CookieService)
  const ruta = inject(Router)
  let valor = cokie.get("access_token")
  if (valor !="") {
    return true;
  } else {
    ruta.navigate(['/'])
    return false;
  }
  
};
