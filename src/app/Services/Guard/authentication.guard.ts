import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);
  const protectedRouter: string[] = [];
  try {
    const isTokenThere = sessionStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? localStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? "";
  
    if(protectedRouter.includes(state.url)){
      return false;
    }
    else{
      if(isTokenThere == null || isTokenThere.trim() == ''){
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }

  } catch (error) {}

  return true;
};