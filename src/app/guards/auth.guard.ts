import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticationService } from '../services/autentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AutenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token') || null;
    const role = localStorage.getItem('role') || null;


    if (!token || !role) {
      this.router.navigate(['login']); // Redireciona para login se não estiver autenticado
      return false;
    }

    const expectedRole: string[] = route.data['roles']; // Obtém o papel esperado da configuração da rota

    // Se a rota não exigir autenticação (pública), permitir o acesso
    if (!expectedRole || expectedRole.length === 0) {
      return true;
    }
    

    if (!expectedRole.includes(role)) {
      this.router.navigate(['egressos']); // Redireciona para uma página de acesso livre
      return false;
    }

    return true;
  }
}