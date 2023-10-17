import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ForgotPasswordDTO } from "../models/forgot-password.dto";
import { ResetPasswordDTO } from "../models/reset-password.dto";
import { UserLoginDTO, UserLoginResponse } from "../models/user-login.dto";
import { UserRegisterDTO, UserRegisterResponse } from "../models/user-register.dto";
import { CustomEncoder } from '../../shared/custom-encoder';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  private baseUrl: string = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  public userRegister(body: UserRegisterDTO): Observable<UserRegisterResponse> {
    var url = this.baseUrl + '/userregister';

    return this.http.post<UserRegisterResponse>(url, body);
  }

  public confirmEmail(token: string, email: string) {
    var url = this.baseUrl + '/emailconfirmation';
    let params = new HttpParams({ encoder: new CustomEncoder() });

    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(url, { params: params });

  }

  public userLogin(body: UserLoginDTO): Observable<UserLoginResponse> {
    var url = this.baseUrl + '/userlogin';

    return this.http.post<UserLoginResponse>(url, body);
  }

  public forgotPassword(body: ForgotPasswordDTO) {
    var url = this.baseUrl + '/forgotpassword';

    return this.http.post(url, body);
  }

  public resetPassword(body: ResetPasswordDTO) {
    var url = this.baseUrl + '/resetpassword';

    return this.http.post(url, body);
  }

  public getClaims() {
    var url = this.baseUrl + '/getclaims';

    return this.http.get(url);
  }

  public isUserAdmin = (): boolean => {
    const decodeToken = this.jwtHelper.decodeToken(this.getToken());
    const role = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return role === 'admin';
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    return token != null && this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.removeItem("token");
  }
}





