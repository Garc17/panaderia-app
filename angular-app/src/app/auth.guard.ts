import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';  // Asegúrate de que tienes un servicio de autenticación
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  
  if (authService.isAuthenticated()) {
    return true;  // Si está autenticado, permite el acceso
  } else {
    return false;  // Si no está autenticado, bloquea el acceso
  }
};
