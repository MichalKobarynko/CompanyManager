import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthRestService } from "../api/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authRestService: AuthRestService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authRestService.isUserAuthenticated()) {
      return true;
    }
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
