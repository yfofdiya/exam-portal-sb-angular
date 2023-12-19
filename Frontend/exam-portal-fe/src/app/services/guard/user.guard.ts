import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isLoggedIn() 
  && inject(LoginService).getUserRole() == 'NORMAL' 
  ? true 
  : (inject(Router).navigate(['login']), false);
};
