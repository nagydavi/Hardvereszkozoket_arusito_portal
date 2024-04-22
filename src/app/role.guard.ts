import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const localData = localStorage.getItem('user');
  if(localData){
    const user = JSON.parse(localData);
    if(user['type_id'] === '1'){
      router.navigateByUrl('/admin/laptops')
      return false;
    }
    return true;
  }else{
    router.navigateByUrl('/admin/login')
    return false;
  }
};
