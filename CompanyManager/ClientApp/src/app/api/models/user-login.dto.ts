export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}
