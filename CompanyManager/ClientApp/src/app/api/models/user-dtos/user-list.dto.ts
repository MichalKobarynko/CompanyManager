import { UserDTO } from "./user.dto";


export interface UserListDTO {
  count: number;
  users: UserDTO[];
}
