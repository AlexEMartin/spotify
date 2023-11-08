import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard = (): boolean => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  try {
    const role: string = cookieService.get('role');

    if (role !== 'admin') {
      router.navigate(['/']);
    }

    return true;
  } catch (e) {
    console.log('Algo sucedio ?? 🔴', e);
    return false;
  }
};
