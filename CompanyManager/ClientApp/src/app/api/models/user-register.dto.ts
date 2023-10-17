
export interface UserRegisterDTO {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  clientURI: string;
}

export interface UserRegisterResponse {
  IsSuccess: boolean;
  errros: string[];
}
