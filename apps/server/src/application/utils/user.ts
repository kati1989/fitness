import { User } from "@server/database/database";

export interface UserForPage {
  firstname: string;
  lastname: string;
  email: string;
}
export const mapUserToUserForPage = (user: User): UserForPage => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
};
