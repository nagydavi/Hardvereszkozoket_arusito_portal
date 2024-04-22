import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  //Ezt azért így kell mert itt nem tudok constructort létrehozni
  const router = inject(Router);
  const localData = localStorage.getItem('user');
  if(localData){
    const user = JSON.parse(localData);
    return true;
  }else{
    router.navigateByUrl('/admin/login')
    return false;
  }
  
};
