import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{
  public token$ = new BehaviorSubject<string>('');
  public userName$ = new BehaviorSubject<string>('');
  public userId$ = new BehaviorSubject<string>('');

  constructor(
    private jwtHelper: JwtHelperService
  ) {

  }


  public logout() {
    this.removeClaims();
  }

  public isUserAuthenticate(): boolean {
    const token = this.getTokenValue();

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  public setClaims(token: string) {
    const decodeToken = this.jwtHelper.decodeToken(token);

    const userId = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const userName = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const role = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];



    localStorage.setItem('token', token);
    localStorage.setItem('currentUserId', userId);
    localStorage.setItem('currentUserName', userName);

    this.token$.next(token);
    this.userName$.next(userName);
    this.userId$.next(userId);
  }

  public removeClaims() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');

    this.token$.next('');
    this.userName$.next('');
    this.userId$.next('');
  }

  public refreshClaims() {
    var token = this.getTokenValue();
    this.setClaims(token);
  }

  public isUserAdmin(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.getTokenValue());
    const role = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return role === 'Admin';
  }

  private getTokenValue(): string {
    return localStorage.getItem('token') || '';
  }
  

  public getToken(): BehaviorSubject<string> {
    return this.token$;
  }

  public getUserName(): BehaviorSubject<string>{
    return this.userName$;
  }

  public getUserID(): any {
    return this.userId$;
  }
}
