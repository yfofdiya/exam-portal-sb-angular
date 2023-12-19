import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isLoggedIn() 
  && inject(LoginService).getUserRole() == 'ADMIN' 
  ? true 
  : (inject(Router).navigate(['login']), false);
};
